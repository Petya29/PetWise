const Router = require('express');
const userRouter = require('./userRouter');
const orderRouter = require('./orderRouter');
const productRouter = require('./productRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);

module.exports = router;