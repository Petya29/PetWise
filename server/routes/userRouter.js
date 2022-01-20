const Router = require('express');
const userController = require('../controllers/userController');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/profile', userController.profile);

module.exports = router;