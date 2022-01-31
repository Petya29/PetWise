const Router = require('express');
const { validate } = require('../validation/validation'); 
const authMiddleware = require('../middleware/AuthMiddleware');
const productController = require('../controllers/productController');

const router = new Router();

router.get('/list', productController.getProducts);

module.exports = router;