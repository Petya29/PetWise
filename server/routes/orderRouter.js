const Router = require('express');
const { validate } = require('../validation/validation'); 
const authMiddleware = require('../middleware/AuthMiddleware');
const orderController = require('../controllers/orderController');

const router = new Router();

router.get('/list', orderController.getOrders);

module.exports = router;