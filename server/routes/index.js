const Router = require('express');
const userRouter = require('./userRouter');
const orderRouter = require('./orderRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/orders', orderRouter);

module.exports = router;