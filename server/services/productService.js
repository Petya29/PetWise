const ApiError = require('../error/ApiError');
const { Product } = require('../database/models');

class ProductService {
    async getProducts(orderBy, limit) {
        const products = await Product.findAll({
            limit: limit,
            order: [
                [orderBy, 'DESC']
            ],
        });
        return products;
    }
}

module.exports = new ProductService();