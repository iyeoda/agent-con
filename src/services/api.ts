import axios from 'axios';
import config from '../config';

// Base API configuration
const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    // Any status code between 200 and 299 triggers this function
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login page or refresh token
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 