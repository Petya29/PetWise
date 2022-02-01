import $api from '../http';

export default class ProductService {
    static async getProducts() {
        return await $api.get('/products/list?orderBy=id&limit=10');
    }
}