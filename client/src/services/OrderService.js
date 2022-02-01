import $api from '../http';

export default class OrderService {
    static async addOrder(productId) {
        return await $api.post('/orders/add', {
            productId: productId
        });
    }
}