const orderService = require("../services/orderService");

class OrderController {
    async getOrders(req, res, next) {
        try {
            const { orderBy = 'id', limit = '10' } = req.query;
            const orders = await orderService.getOrders(orderBy, limit);
            res.json(orders);
        } catch (e) {
            res.status(e.status).send(e);
        }
    }

    async addOrder(req, res, next) {
        try {
            const { productId } = req.body;
            const userId = req.user.id;

            const orderData = await orderService.addOrder(productId, userId);

            res.json(orderData);
        } catch (e) {
            res.status(e.status).send(e);
        }
    }
}

module.exports = new OrderController();