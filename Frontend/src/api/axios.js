import axios from 'axios';

// Resolve base URL safely across local dev, Vite proxy, and production
const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In development, fallback to localhost:5000 if not proxying directly
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }
  return '';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for attaching auth headers and user context
api.interceptors.request.use(
  (config) => {
    try {
      const savedUser = localStorage.getItem('hiringwallah_auth_user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user?.token) {
          config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        if (user?.email) {
          config.headers['x-user-email'] = user.email;
        }
      }
    } catch (e) {
      // Ignore localStorage read errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent data extraction and smooth error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = 'An unexpected error occurred';
    let statusCode = error.response?.status || 500;

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.status === 404) {
      message = `Requested resource was not found (${error.config?.url || 'endpoint'}).`;
    } else if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      message = 'Server request timed out. Please check your internet connection.';
    } else if (!error.response && error.request) {
      message = 'Cannot connect to the server. Please ensure the backend is running.';
    } else if (error.message) {
      message = error.message;
    }

    const customError = new Error(message);
    customError.status = statusCode;
    customError.originalError = error;
    
    // Log as a clean warning rather than unhandled exception
    console.warn(`[API ${statusCode}] ${error.config?.method?.toUpperCase() || 'REQ'} ${error.config?.url || ''}:`, message);
    return Promise.reject(customError);
  }
);

export default api;

