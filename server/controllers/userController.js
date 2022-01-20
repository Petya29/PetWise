const userService = require('../services/userService');

class UserController {
    async registration(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const userData = await userService.registration(name, email, password);

            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                    httpOnly: true
                });

            return res.json(userData);
        } catch (e) {
            res.send(e);;
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                    httpOnly: true
                });

            return res.json(userData);
        } catch (e) {
            res.send(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            res.send(e);;
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            res.send(e);;
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            const userData = await userService.refresh(refreshToken);

            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                    httpOnly: true
                });

            return res.json(userData);
        } catch (e) {
            res.send(e);;
        }
    }

    async profile(req, res, next) {
        try {
            const userId = req.user.id
            const user = await userService.profile(userId);
            res.json(user);
        } catch (e) {
            res.send(e);;
        }
    }
}

module.exports = new UserController();