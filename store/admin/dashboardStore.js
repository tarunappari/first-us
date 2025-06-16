// store/admin/dashboardStore.js
import { create } from 'zustand';
import { apiClient } from '../common/apiConfig';

const useAdminDashboardStore = create((set, get) => ({
  // State
  stats: {
    totalUsers: 108,
    totalEmployers: 25,
    totalJobs: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    activeProjects: 0,
  },
  attendanceData: [
    { day: 'Mon', users: 88, employers: 92 },
    { day: 'Tue', users: 85, employers: 89 },
    { day: 'Wed', users: 90, employers: 95 },
    { day: 'Thu', users: 87, employers: 91 },
    { day: 'Fri', users: 92, employers: 88 },
    { day: 'Sat', users: 78, employers: 82 },
    { day: 'Sun', users: 75, employers: 79 },
  ],
  taskDistribution: [
    { name: 'Completed', value: 45, color: '#10b981' },
    { name: 'In Progress', value: 35, color: '#f59e0b' },
    { name: 'Pending', value: 20, color: '#ef4444' },
  ],
  recentActivities: [],
  reports: [],
  loading: false,
  error: null,
  lastUpdated: null,

  // Get Dashboard Stats
  getDashboardStats: async (data = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/dashboard/stats', data);
      
      set({ 
        stats: response.data,
        loading: false,
        lastUpdated: new Date().toISOString(),
      });

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error getting dashboard stats:', error);
      throw error;
    }
  },

  // Get Attendance Data
  getAttendanceData: async (period = 'week') => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/dashboard/attendance', { period });
      
      set({ 
        attendanceData: response.data,
        loading: false,
      });

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error getting attendance data:', error);
      throw error;
    }
  },

  // Get Task Distribution
  getTaskDistribution: async (data = {}) => {
    try {
      const response = await apiClient.post('/dashboard/task-distribution', data);
      
      set({ taskDistribution: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error getting task distribution:', error);
      throw error;
    }
  },

  // Get Recent Activities
  getRecentActivities: async (data = {}) => {
    try {
      const response = await apiClient.post('/dashboard/activities', data);
      
      set({ recentActivities: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error getting recent activities:', error);
      throw error;
    }
  },

  // Generate Report
  generateReport: async (reportType, dateRange) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/dashboard/reports', {
        type: reportType,
        dateRange,
      });
      
      set((state) => ({
        reports: [response.data, ...state.reports],
        loading: false,
      }));

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error generating report:', error);
      throw error;
    }
  },

  // Export Data
  exportData: async (dataType, format = 'csv') => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get('/dashboard/export', {
        params: { dataType, format },
        responseType: 'blob',
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${dataType}_export.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      set({ loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error exporting data:', error);
      throw error;
    }
  },

  // Get System Analytics
  getSystemAnalytics: async (data = {}) => {
    try {
      const response = await apiClient.post('/dashboard/analytics', data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error getting system analytics:', error);
      throw error;
    }
  },

  // Get Performance Metrics
  getPerformanceMetrics: async (data = {}) => {
    try {
      const response = await apiClient.post('/dashboard/performance', data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error getting performance metrics:', error);
      throw error;
    }
  },

  // Update Dashboard Stats (manual calculation)
  updateDashboardStats: (newStats) => {
    set((state) => ({
      stats: { ...state.stats, ...newStats },
      lastUpdated: new Date().toISOString(),
    }));
  },

  // Add Recent Activity
  addRecentActivity: (activity) => {
    const newActivity = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...activity,
    };

    set((state) => ({
      recentActivities: [newActivity, ...state.recentActivities.slice(0, 9)], // Keep only 10 recent activities
    }));
  },

  // Refresh All Dashboard Data
  refreshDashboard: async () => {
    set({ loading: true, error: null });
    try {
      // Fetch all dashboard data in parallel
      const [statsResult, attendanceResult, activitiesResult] = await Promise.allSettled([
        get().getDashboardStats(),
        get().getAttendanceData(),
        get().getRecentActivities(),
      ]);

      // Check for any failures
      const failures = [statsResult, attendanceResult, activitiesResult]
        .filter(result => result.status === 'rejected');

      if (failures.length > 0) {
        console.warn('Some dashboard data failed to load:', failures);
      }

      set({ 
        loading: false,
        lastUpdated: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error refreshing dashboard:', error);
      throw error;
    }
  },

  // Get User Growth Data
  getUserGrowthData: async (period = 'month') => {
    try {
      const response = await apiClient.post('/dashboard/user-growth', { period });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error getting user growth data:', error);
      throw error;
    }
  },

  // Get Revenue Analytics
  getRevenueAnalytics: async (data = {}) => {
    try {
      const response = await apiClient.post('/dashboard/revenue', data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error getting revenue analytics:', error);
      throw error;
    }
  },

  // Clear Error
  clearError: () => {
    set({ error: null });
  },

  // Reset State
  resetState: () => {
    set({
      stats: {
        totalUsers: 0,
        totalEmployers: 0,
        totalJobs: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        activeProjects: 0,
      },
      attendanceData: [],
      taskDistribution: [],
      recentActivities: [],
      reports: [],
      loading: false,
      error: null,
      lastUpdated: null,
    });
  },
}));

export default useAdminDashboardStore;
