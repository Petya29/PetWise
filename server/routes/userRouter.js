const Router = require('express');
const authMiddleware = require('../middleware/AuthMiddleware');
const userController = require('../controllers/userController');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/profile', authMiddleware, userController.profile);

module.exports = router;