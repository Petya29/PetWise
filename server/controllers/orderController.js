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
            
        } catch (e) {
            res.status(e.status).send(e);
        }
    }
}

module.exports = new OrderController();