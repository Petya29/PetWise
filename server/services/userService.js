const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { User } = require('../database/models');
const mailService = require('./mailService');
const tokenService = require('./tokenService');

class userService {
    async registration(name, email, password) {
        const candidate = await User.findOne({ where: { email: email } });
        if (candidate) {
            throw ApiError.badRequest('User with this email already exists', [{ msg: 'User with this email already exists' }]);
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = uuid.v4(); // Random unique string
        const user = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            activationLink: activationLink
        });

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`); // Send mail

        const tokens = tokenService.generateJWT({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isActivated: user.isActivated
        });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return { user: user, ...tokens }
    }

    async activate(activationLink) {
        const user = await User.findOne({ where: { activationLink: activationLink } });
        if (!user) {
            throw ApiError.badRequest('Incorrect activation link', [{ msg: 'Incorrect activation link' }]);
        }

        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            throw ApiError.badRequest('User with this email not found', [{ msg: 'User with this email not found' }]);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.badRequest('Password does not match', [{ msg: 'Password does not match' }]);
        }

        const tokens = tokenService.generateJWT({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isActivated: user.isActivated
        });

        await tokenService.saveToken(user.id, tokens.refreshToken);

        return { user: user, ...tokens }
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            return null;
        }
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findRefreshToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorizedError();
        }

        const user = await User.findOne({ where: { email: userData.email } });
        if (!user) {
            throw ApiError.unauthorizedError();
        }
        const tokens = tokenService.generateJWT({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isActivated: user.isActivated
        });

        await tokenService.saveToken(user.id, tokens.refreshToken);

        return { user: user, ...tokens }
    }

    async profile(userId) {
        const user = await User.findByPk(
            userId,
            {
                attributes: [
                    'id',
                    'name',
                    'email',
                    'role',
                    'isActivated'
                ]
            }
        );

        return user;
    }

    async addCount(email, token, values = 0) {
        if (token !== process.env.TOKEN) throw ApiError.forbiden("Token doesn't match", [{ msg: "Token doesn't match" }]);

        const user = await User.findOne({ where: { email: email } });
        if (!user) throw ApiError.badRequest("User with this email didn't exist", [{ msg: "User with this email didn't exist" }]);

        const incrementResult = await user.increment(['count'], { by: values });

        return incrementResult;
    }

    async getCount(userId) {
        const user = await User.findByPk(
            userId,
            {
                attributes: [
                    'count'
                ]
            }
        );

        if (!user) throw ApiError.badRequest("User with this id didn't exist", [{ msg: "User with this id didn't exist" }]);

        return user;
    }
}

module.exports = new userService();