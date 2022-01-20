const jwt = require('jsonwebtoken');
const { Token } = require('../database/models');

class TokenService {
    generateJWT(payload) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET_KEY,
            {
                expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
            });

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET_KEY,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
            });

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const token = await Token.findOne({ where: { userId: userId } });
        if (token) {
            token.refreshToken = refreshToken;
            return token.save();
        }

        const newToken = await Token.create({
            userId: userId,
            refreshToken: refreshToken
        });

        return newToken;
    }

    async removeToken(refreshToken) {
        if (!refreshToken) {
            return null;
        }
        const tokenData = await Token.destroy({ where: { refreshToken: refreshToken } });
        return tokenData;
    }

    validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findRefreshToken(refreshToken) {
        const tokenData = await Token.findOne({ where: { refreshToken: refreshToken } });
        return tokenData;
    }
}

module.exports = new TokenService();