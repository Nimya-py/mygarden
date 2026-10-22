import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to attach Authorization header if token exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('plant_nursery_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses for global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional auto-logout on expired token
      localStorage.removeItem('plant_nursery_token');
      localStorage.removeItem('plant_nursery_user');
    }
    return Promise.reject(error);
  }
);

export default API;
