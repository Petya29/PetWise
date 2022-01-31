const ApiError = require('../error/ApiError');
const { Order, Product, User } = require('../database/models');

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

    async addOrder(productId, userId) {
        const user = await User.findByPk(userId);
        if (!user) throw ApiError.unauthorizedError();

        const product = await Product.findByPk(productId);
        if (!product) throw ApiError.badRequest("Product with this id doesn't exist", [{ msg: "Product with this id doesn't exist" }]);

        if (user.count >= product.cost) {
            const newOrder = await Order.create({
                userId: userId,
                sum: product.cost,
                productId: productId
            });

            await user.decrement(['count'], { by: product.cost });

            return newOrder;
        } else {
            throw ApiError.badRequest("You don't have enough money to buy this product", [{ msg: "You don't have enough money to buy this product" }]);
        }
    }
}

module.exports = new OrderService();