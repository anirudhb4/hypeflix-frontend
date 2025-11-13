import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the Token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('sb-access-token'); // We will save token here later
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;