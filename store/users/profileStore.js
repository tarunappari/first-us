// store/users/profileStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '../common/apiConfig';

const useUserProfileStore = create(
  persist(
    (set, get) => ({
      // State
      profile: null,
      preferences: {
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          taskReminders: true,
          deadlineAlerts: true,
        },
        language: 'en',
        timezone: 'UTC',
      },
      loading: false,
      error: null,
      achievements: [],
      activityLog: [],

      // Get User Profile
      getProfile: async () => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.get('/users/profile');
          
          set({ 
            profile: response.data,
            loading: false,
          });

          return { success: true, data: response.data };
        } catch (error) {
          set({ loading: false, error: error.message });
          console.error('Error getting profile:', error);
          throw error;
        }
      },

      // Update Profile
      updateProfile: async (profileData) => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.patch('/users/profile', profileData);
          
          set({ 
            profile: { ...get().profile, ...response.data },
            loading: false,
          });

          return { success: true, data: response.data };
        } catch (error) {
          set({ loading: false, error: error.message });
          console.error('Error updating profile:', error);
          throw error;
        }
      },

      // Upload Profile Picture
      uploadProfilePicture: async (file) => {
        set({ loading: true, error: null });
        try {
          const formData = new FormData();
          formData.append('profilePicture', file);

          const response = await apiClient.post('/users/profile/picture', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          set((state) => ({ 
            profile: { ...state.profile, profilePicture: response.data.profilePicture },
            loading: false,
          }));

          return { success: true, data: response.data };
        } catch (error) {
          set({ loading: false, error: error.message });
          console.error('Error uploading profile picture:', error);
          throw error;
        }
      },

      // Change Password
      changePassword: async (passwordData) => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.patch('/users/profile/password', passwordData);
          
          set({ loading: false });
          return { success: true, data: response.data };
        } catch (error) {
          set({ loading: false, error: error.message });
          console.error('Error changing password:', error);
          throw error;
        }
      },

      // Update Preferences
      updatePreferences: async (preferences) => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.patch('/users/profile/preferences', preferences);
          
          set({ 
            preferences: { ...get().preferences, ...preferences },
            loading: false,
          });

          return { success: true, data: response.data };
        } catch (error) {
          set({ loading: false, error: error.message });
          console.error('Error updating preferences:', error);
          throw error;
        }
      },

      // Get User Achievements
      getAchievements: async () => {
        try {
          const response = await apiClient.get('/users/achievements');
          
          set({ achievements: response.data });
          return { success: true, data: response.data };
        } catch (error) {
          console.error('Error getting achievements:', error);
          throw error;
        }
      },

      // Get Activity Log
      getActivityLog: async (limit = 50) => {
        try {
          const response = await apiClient.get('/users/activity-log', {
            params: { limit },
          });
          
          set({ activityLog: response.data });
          return { success: true, data: response.data };
        } catch (error) {
          console.error('Error getting activity log:', error);
          throw error;
        }
      },

      // Get User Statistics
      getUserStats: async () => {
        try {
          const response = await apiClient.get('/users/stats');
          return { success: true, data: response.data };
        } catch (error) {
          console.error('Error getting user stats:', error);
          throw error;
        }
      },

      // Update Notification Settings
      updateNotificationSettings: async (notificationSettings) => {
        const updatedPreferences = {
          ...get().preferences,
          notifications: { ...get().preferences.notifications, ...notificationSettings },
        };

        return get().updatePreferences(updatedPreferences);
      },

      // Set Theme
      setTheme: (theme) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            theme,
          },
        }));

        // Update document theme attribute
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
        }

        // Save to backend
        get().updatePreferences({ theme });
      },

      // Toggle Theme
      toggleTheme: () => {
        const { preferences } = get();
        const newTheme = preferences.theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      // Set Language
      setLanguage: (language) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            language,
          },
        }));

        // Save to backend
        get().updatePreferences({ language });
      },

      // Set Timezone
      setTimezone: (timezone) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            timezone,
          },
        }));

        // Save to backend
        get().updatePreferences({ timezone });
      },

      // Enable/Disable Notifications
      toggleNotifications: (type, enabled) => {
        const updatedNotifications = {
          ...get().preferences.notifications,
          [type]: enabled,
        };

        get().updateNotificationSettings(updatedNotifications);
      },

      // Request Account Deletion
      requestAccountDeletion: async (reason = '') => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.post('/users/profile/delete-request', { reason });
          
          set({ loading: false });
          return { success: true, data: response.data };
        } catch (error) {
          set({ loading: false, error: error.message });
          console.error('Error requesting account deletion:', error);
          throw error;
        }
      },

      // Export User Data
      exportUserData: async (format = 'json') => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.get('/users/profile/export', {
            params: { format },
            responseType: 'blob',
          });
          
          // Create download link
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `user_data.${format}`);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);

          set({ loading: false });
          return { success: true };
        } catch (error) {
          set({ loading: false, error: error.message });
          console.error('Error exporting user data:', error);
          throw error;
        }
      },

      // Add Activity to Log (local)
      addActivity: (activity) => {
        const newActivity = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...activity,
        };

        set((state) => ({
          activityLog: [newActivity, ...state.activityLog.slice(0, 49)], // Keep only 50 recent activities
        }));
      },

      // Get Profile Completion Percentage
      getProfileCompletion: () => {
        const { profile } = get();
        if (!profile) return 0;

        const requiredFields = ['name', 'email', 'phone', 'bio', 'profilePicture'];
        const completedFields = requiredFields.filter(field => 
          profile[field] && profile[field].toString().trim() !== ''
        );

        return Math.round((completedFields.length / requiredFields.length) * 100);
      },

      // Clear Error
      clearError: () => {
        set({ error: null });
      },

      // Reset State
      resetState: () => {
        set({
          profile: null,
          loading: false,
          error: null,
          achievements: [],
          activityLog: [],
        });
      },
    }),
    {
      name: 'user-profile-store',
      partialize: (state) => ({
        preferences: state.preferences,
      }),
    }
  )
);

export default useUserProfileStore;
