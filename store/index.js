// store/index.js
// Main store exports for easy importing

// Import stores for internal use
import useAuthStore from './common/authStore';
import useUIStore from './common/uiStore';
import { apiClient } from './common/apiConfig';

import useAdminTaskStore from './admin/taskStore';
import useAdminUserStore from './admin/userStore';
import useAdminDashboardStore from './admin/dashboardStore';

import useEmployerTaskStore from './employers/taskStore';

import useUserTaskStore from './users/taskStore';
import useUserProfileStore from './users/profileStore';

// Export stores for external use
export { useAuthStore };
export { useUIStore };
export { apiClient };

export { useAdminTaskStore };
export { useAdminUserStore };
export { useAdminDashboardStore };

export { useEmployerTaskStore };

export { useUserTaskStore };
export { useUserProfileStore };

// Store type constants
export const USER_TYPES = {
  ADMIN: 'admin',
  EMPLOYER: 'employer',
  USER: 'user',
};

// Helper function to get appropriate stores based on user role
export const getStoresByRole = (role) => {
  const commonStores = {
    auth: useAuthStore,
    ui: useUIStore,
  };

  switch (role) {
    case USER_TYPES.ADMIN:
      return {
        ...commonStores,
        tasks: useAdminTaskStore,
        users: useAdminUserStore,
        dashboard: useAdminDashboardStore,
      };

    case USER_TYPES.EMPLOYER:
      return {
        ...commonStores,
        tasks: useEmployerTaskStore,
        team: useEmployerTeamStore,
        profile: useUserProfileStore,
      };

    case USER_TYPES.USER:
      return {
        ...commonStores,
        tasks: useUserTaskStore,
        profile: useUserProfileStore,
      };

    default:
      return commonStores;
  }
};

// Helper function to initialize stores based on user role
export const initializeStores = async (user) => {
  if (!user) return;

  const stores = getStoresByRole(user.role);
  
  // Initialize common stores
  if (stores.auth) {
    // Auth store is already initialized
  }
  
  if (stores.ui) {
    // Set theme from user preferences
    if (user.preferences?.theme) {
      stores.ui.getState().setTheme(user.preferences.theme);
    }
  }

  // Initialize role-specific stores
  switch (user.role) {
    case USER_TYPES.ADMIN:
      // Initialize admin stores
      if (stores.dashboard) {
        await stores.dashboard.getState().getDashboardStats();
      }
      break;

    case USER_TYPES.EMPLOYER:
      // Initialize employer stores
      if (stores.team) {
        await stores.team.getState().getTeamMembers();
      }
      break;

    case USER_TYPES.USER:
      // Initialize user stores
      if (stores.profile) {
        await stores.profile.getState().getProfile();
      }
      if (stores.tasks) {
        await stores.tasks.getState().getYourTasks();
      }
      break;
  }
};

// Helper function to clear all stores on logout
export const clearAllStores = () => {
  // Clear auth store
  useAuthStore.getState().logout();
  
  // Clear UI store notifications and reset some state
  useUIStore.getState().clearAllNotifications();
  useUIStore.getState().closeAllModals();
  
  // Clear admin stores
  useAdminTaskStore.getState().resetState();
  useAdminUserStore.getState().resetState();
  useAdminDashboardStore.getState().resetState();
  
  // Clear employer stores
  useEmployerTaskStore.getState().resetState();
  useEmployerTeamStore.getState().resetState();
  
  // Clear user stores
  useUserTaskStore.getState().resetState();
  useUserProfileStore.getState().resetState();
};

export default {
  // Common
  useAuthStore,
  useUIStore,
  
  // Admin
  useAdminTaskStore,
  useAdminUserStore,
  useAdminDashboardStore,
  
  // Employer
  useEmployerTaskStore,
  
  // User
  useUserTaskStore,
  useUserProfileStore,
  
  // Utilities
  getStoresByRole,
  initializeStores,
  clearAllStores,
  USER_TYPES,
};
