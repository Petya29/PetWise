import $api from '../http';

export default class AuthService {
    static async profile() {
        return await $api.get('/user/profile');
    }
}