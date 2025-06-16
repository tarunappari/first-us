// lib/config/api.js
// API Configuration with Axios
import axios from 'axios';

// Base URL for the backend API
export const API_BASE_URL = 'https://news-app-backend-lo3a.onrender.com';

// Create Axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  // Add additional configuration for better CORS handling
  withCredentials: true, // Set to true if your backend requires credentials
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
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
    console.log('✅ API Response Success:', response.config.url, response.status);
    return response;
  },
  (error) => {
    // Enhanced error logging for debugging
    console.group('🚨 API Error Details');
    console.log('Error object:', error);
    console.log('Request config:', error.config);
    console.log('Response:', error.response);
    console.log('Request:', error.request);
    console.log('Message:', error.message);
    console.groupEnd();

    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.log(`📡 Server responded with status: ${status}`);

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
          // Forbidden
          console.error('Access forbidden:', data?.message);
          break;
        case 500:
          // Server error
          console.error('Server error:', data?.message);
          break;
        default:
          console.error('API Error:', data?.message || error.message);
      }

      // Return a more user-friendly error
      const errorMessage = data?.message || `Request failed with status ${status}`;
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Network error - no response received
      console.error('🌐 Network error details:');
      console.error('- URL:', error.config?.url);
      console.error('- Method:', error.config?.method);
      console.error('- Timeout:', error.config?.timeout);
      console.error('- Error code:', error.code);
      console.error('- Error message:', error.message);

      // Check for specific network error types
      if (error.code === 'ECONNABORTED') {
        return Promise.reject(new Error('Request timeout. The server is taking too long to respond.'));
      } else if (error.code === 'ERR_NETWORK') {
        return Promise.reject(new Error('Network error. Please check your internet connection and try again.'));
      } else if (error.code === 'ERR_BLOCKED_BY_CLIENT') {
        return Promise.reject(new Error('Request blocked. Please check your browser settings or ad blockers.'));
      } else {
        return Promise.reject(new Error(`Network error: ${error.message}. Please check your connection and server status.`));
      }
    } else {
      // Other error
      console.error('❌ Other error:', error.message);
      return Promise.reject(error);
    }
  }
);

// Export the configured Axios instance
export { apiClient };

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER_ADMIN: '/api/auth/register-admin',
    REGISTER_USER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
    PROFILE: '/api/auth/profile',
    CHANGE_PASSWORD: '/api/auth/change-password',
  },
  
  // Tasks endpoints (when available)
  TASKS: {
    LIST: '/api/tasks',
    CREATE: '/api/tasks',
    UPDATE: '/api/tasks',
    DELETE: '/api/tasks',
    STATS: '/api/tasks/stats',
  },
  
  // Users endpoints (when available)
  USERS: {
    LIST: '/api/users',
    CREATE: '/api/users',
    UPDATE: '/api/users',
    DELETE: '/api/users',
  },
  
  // Dashboard endpoints (when available)
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
    ATTENDANCE: '/api/dashboard/attendance',
    ACTIVITIES: '/api/dashboard/activities',
    REPORTS: '/api/dashboard/reports',
    EXPORT: '/api/dashboard/export',
  },
};

// Helper function to build full API URLs (for reference)
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Axios-based API request wrapper
export const apiRequest = async (method, endpoint, data = null, config = {}) => {
  try {
    const response = await apiClient({
      method,
      url: endpoint,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    // Error is already handled by the response interceptor
    throw error;
  }
};

// Specific API methods using Axios
export const authAPI = {
  login: async (credentials) => {
    // Don't include auth token for login
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials, {
      headers: {
        'Content-Type': 'application/json',
        // Remove Authorization header for login
        Authorization: undefined,
      },
    });
    return response.data;
  },

  registerAdmin: async (userData) => {
    // Don't include auth token for registration
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER_ADMIN, userData, {
      headers: {
        'Content-Type': 'application/json',
        // Remove Authorization header for registration
        Authorization: undefined,
      },
    });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await apiClient.put(API_ENDPOINTS.AUTH.PROFILE, profileData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await apiClient.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData);
    return response.data;
  },
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  apiClient,
  buildApiUrl,
  apiRequest,
  authAPI,
};
