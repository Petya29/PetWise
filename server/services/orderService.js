const ApiError = require('../error/ApiError');
const { Order, Product } = require('../database/models');

class OrderService {
    async getOrders(orderBy, limit) {
        const orders = await Order.findAll({
            limit: limit,
            order: [
                [orderBy, 'DESC']
            ],
            include: Product
        });
        return orders;
    }
}

module.exports = new OrderService();