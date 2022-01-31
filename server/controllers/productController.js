const productService = require("../services/productService");

class ProductController {
    async getProducts(req, res, next) {
        try {
            const { orderBy = 'id', limit = '10' } = req.query;
            const products = await productService.getProducts(orderBy, limit);
            res.json(products);
        } catch (e) {
            res.status(e.status).send(e);
        }
    }
}

module.exports = new ProductController();