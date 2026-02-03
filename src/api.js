import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    // baseURL: 'https://spring-boot-production-bb3d.up.railway.app',
});

export default api;