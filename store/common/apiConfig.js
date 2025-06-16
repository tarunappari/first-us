// store/common/apiConfig.js
import axios from 'axios';

// API Configuration
export const BASE_URL = 'https://news-app-backend-lo3a.onrender.com';

// Create Axios instance for API calls
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor to add dynamic auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage if available
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear tokens and redirect to login
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/signin';
          }
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.data?.message || error.message);
      }
      
      const errorMessage = error.response.data?.message || `Request failed with status ${status}`;
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  }
);

export default apiClient;
