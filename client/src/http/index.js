import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASE_API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalrequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalrequest._isRetry = true;
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/user/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalrequest);
        } catch (e) {
            console.log('Unauthorize');
        }
    }
    throw error;
});

export default $api;