import axios from 'axios';
import $api from '../http';

export default class AuthService {
    static async registration(name, email, password, confirmPassword) {
        return await $api.post('/user/registration', {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
    }

    static async login(email, password) {
        return await $api.post('/user/login', {
            email: email,
            password: password
        });
    }

    static async logout() {
        return await $api.post('/user/logout');
    }

    static async checkAuth() {
        return await axios.get(`${process.env.REACT_APP_BASE_API_URL}/user/refresh`, { withCredentials: true });
    }
}