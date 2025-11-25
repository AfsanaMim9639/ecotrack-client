import axios from 'axios';

// Create axios instance with your server URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://ecotrack-server-three.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
  withCredentials: true, // Important for CORS with credentials
});

// Request interceptor - Add auth token if needed
api.interceptors.request.use(
  (config) => {
    // If you have auth token, add it here
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

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response.data, // Return only data
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;