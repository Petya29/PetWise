const { body } = require('express-validator');

const registrationSchema = [
    body('name').isLength({ min: 4, max: 16 }).withMessage('Name must be at least 4 and no more than 16 characters'),
    body('email').isEmail().withMessage('Incorrect email'),
    body('password').isLength({ min: 4, max: 16 }).withMessage('Password must be at least 4 and no more than 16 characters'),
    body('confirmPassword').custom((value, { req, loc, path }) => {
        if (value === req.body.password) {
            return true;
        } else {
            return false;
        }
    }).withMessage('Passwords do not match')
];

const loginSchema = [
    body('email').isEmail().withMessage('Incorrect email'),
    body('password').isLength({ min: 4, max: 16 }).withMessage('Password must be at least 4 and no more than 16 characters')
];

module.exports = {
    registrationSchema,
    loginSchema
}