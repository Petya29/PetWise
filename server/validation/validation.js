const { validationResult } = require('express-validator');
const ApiError = require('../error/ApiError');

const validate = (schemas) => {
    return async (req, res, next) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));

        const result = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }

        const errors = result.array();
        // return res.send({
        //     message: 'Validation error',
        //     errors: errors,
        // })
        return res.send(ApiError.badRequest('validation error', ...errors));
    };
}

module.exports = {
    validate
}