import axios from 'axios';
import { getToken } from '../services/GetToken';

const api = axios.create({
    baseURL: 'https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default', 
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default api;