import axios from 'axios';

// Backend address: set VITE_API_URL in .env (locally) or in Vercel project settings.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

export default api;
