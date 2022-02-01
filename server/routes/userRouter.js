const Router = require('express');
const { validate } = require('../validation/validation'); 
const { registrationSchema, loginSchema } = require('../validation/validationSchemas');
const authMiddleware = require('../middleware/AuthMiddleware');
const userController = require('../controllers/userController');

const router = new Router();

router.post('/registration', validate(registrationSchema), userController.registration);
router.post('/login', validate(loginSchema), userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/profile', authMiddleware, userController.profile);

router.post('/add-count', userController.addCount);
router.get('/:id/count', userController.getCount);

module.exports = router;