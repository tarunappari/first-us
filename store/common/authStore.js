// store/common/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from './apiConfig';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      rememberMe: false,

      // Login action
      login: async (credentials) => {
        set({ loading: true, error: null });

        try {
          const response = await apiClient.post('/api/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          const { user, token } = response.data.data;
          
          // Store token based on remember me preference
          if (token){
            sessionStorage.setItem('authToken', token);
          }

          // Ensure user has a role (default to 'user' if not provided)
          const userWithRole = {
            ...user,
            role: user.role || 'user'
          };

          set({
            user: userWithRole,
            isAuthenticated: true,
            loading: false,
            error: null,
            rememberMe: credentials.rememberMe,
          });

          return { success: true, user: userWithRole };
        } catch (error) {
          set({
            loading: false,
            error: error.message,
          });
          return { success: false, error: error.message };
        }
      },

      // Register action
      register: async (userData) => {
        set({ loading: true, error: null });

        try {
          const response = await apiClient.post('/api/auth/register-admin', userData);
          
          set({
            loading: false,
            error: null,
          });

          return { success: true, data: response.data };
        } catch (error) {
          set({
            loading: false,
            error: error.message,
          });
          return { success: false, error: error.message };
        }
      },

      // Logout action
      logout: async () => {
        // Clear tokens and state
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');

        set({
          user: null,
          isAuthenticated: false,
          error: null,
          rememberMe: false,
        });

        return { success: true };
      },

      // Check authentication status
      checkAuth: async () => {
        const token = sessionStorage.getItem('authToken');
        
        if (!token) {
          return { success: false, error: 'No token found' };
        }

        set({ loading: true });

        try {
          const response = await apiClient.get('/api/auth/me');
          const userData = response.data;
          
          const user = {
            ...(userData.user || userData),
            role: (userData.user || userData).role || 'user'
          };

          set({
            user,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return { success: true, user };
        } catch (error) {
          // Clear invalid token
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: error.message,
          });

          return { success: false, error: error.message };
        }
      },

      // Update profile
      updateProfile: async (profileData) => {
        set({ loading: true, error: null });

        try {
          const response = await apiClient.put('/api/auth/profile', profileData);
          const updatedUserData = response.data;
          
          const updatedUser = {
            ...(updatedUserData.user || updatedUserData),
            role: (updatedUserData.user || updatedUserData).role || 'user'
          };

          set({
            user: updatedUser,
            loading: false,
            error: null,
          });

          return { success: true, user: updatedUser };
        } catch (error) {
          set({
            loading: false,
            error: error.message,
          });
          return { success: false, error: error.message };
        }
      },

      // Change password
      changePassword: async (passwordData) => {
        set({ loading: true, error: null });

        try {
          await apiClient.put('/api/auth/change-password', passwordData);

          set({
            loading: false,
            error: null,
          });

          return { success: true };
        } catch (error) {
          set({
            loading: false,
            error: error.message,
          });
          return { success: false, error: error.message };
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Utility functions
      hasRole: (role) => {
        const { user } = get();
        return user?.role === role;
      },

      hasAnyRole: (roles) => {
        const { user } = get();
        return roles.includes(user?.role);
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        rememberMe: state.rememberMe,
      }),
    }
  )
);

export default useAuthStore;
