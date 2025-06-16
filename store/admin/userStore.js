// store/admin/userStore.js
import { create } from 'zustand';
import { apiClient } from '../common/apiConfig';

const useAdminUserStore = create((set, get) => ({
  // State
  users: [],
  loading: false,
  error: null,
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    newUsersThisMonth: 0,
  },
  filters: {
    role: 'all',
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },

  // Get All Users
  getAllUsers: async (data = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/users/all-users', data);
      
      set({ 
        users: response.data.users || response.data,
        loading: false,
        pagination: {
          ...get().pagination,
          total: response.data.total || response.data.length,
        }
      });

      // Calculate stats from loaded users
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error getting all users:', error);
      throw error;
    }
  },

  // Create User
  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/users/', userData);
      
      // Add new user to the list
      set((state) => ({
        users: [response.data, ...state.users],
        loading: false,
      }));

      // Recalculate stats
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update User
  updateUser: async (userId, userData) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.patch(`/users/?userId=${userId}`, userData);
      
      // Update user in the list
      set((state) => ({
        users: state.users.map(user => 
          user.id === userId ? { ...user, ...response.data } : user
        ),
        loading: false,
      }));

      // Recalculate stats
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete User
  deleteUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.delete(`/users/?userId=${userId}`);
      
      // Remove user from the list
      set((state) => ({
        users: state.users.filter(user => user.id !== userId),
        loading: false,
      }));

      // Recalculate stats
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Get User Details
  getUserDetails: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get(`/users/details`, {
        params: { userId },
      });
      
      set({ loading: false });
      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error retrieving user details:', error);
      throw error;
    }
  },

  // Get User Stats
  getUserStats: async (data = {}) => {
    try {
      const response = await apiClient.post('/users/stats', data);
      
      set({ stats: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw error;
    }
  },

  // Activate/Deactivate User
  toggleUserStatus: async (userId, status) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.patch(`/users/status`, {
        userId,
        status,
      });
      
      // Update user status in the list
      set((state) => ({
        users: state.users.map(user => 
          user.id === userId ? { ...user, status } : user
        ),
        loading: false,
      }));

      // Recalculate stats
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error toggling user status:', error);
      throw error;
    }
  },

  // Assign Role to User
  assignRole: async (userId, role) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.patch(`/users/role`, {
        userId,
        role,
      });
      
      // Update user role in the list
      set((state) => ({
        users: state.users.map(user => 
          user.id === userId ? { ...user, role } : user
        ),
        loading: false,
      }));

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error assigning role:', error);
      throw error;
    }
  },

  // Bulk Operations
  bulkUpdateUsers: async (userIds, updateData) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.patch('/users/bulk-update', {
        userIds,
        updateData,
      });
      
      // Update multiple users in the list
      set((state) => ({
        users: state.users.map(user => 
          userIds.includes(user.id) ? { ...user, ...updateData } : user
        ),
        loading: false,
      }));

      // Recalculate stats
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error bulk updating users:', error);
      throw error;
    }
  },

  // Calculate Stats from current users
  calculateStats: () => {
    const { users } = get();
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(user => user.status === 'active').length,
      inactiveUsers: users.filter(user => user.status === 'inactive').length,
      newUsersThisMonth: users.filter(user => 
        new Date(user.createdAt) >= thisMonth
      ).length,
    };
    
    set({ stats });
    return stats;
  },

  // Set Filters
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, page: 1 }, // Reset to first page
    }));
  },

  // Set Pagination
  setPagination: (pagination) => {
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    }));
  },

  // Search Users
  searchUsers: (query) => {
    const { users } = get();
    if (!query) return users;
    
    return users.filter(user => 
      user.name?.toLowerCase().includes(query.toLowerCase()) ||
      user.email?.toLowerCase().includes(query.toLowerCase()) ||
      user.role?.toLowerCase().includes(query.toLowerCase())
    );
  },

  // Filter Users by Role
  getUsersByRole: (role) => {
    const { users } = get();
    if (role === 'all') return users;
    
    return users.filter(user => user.role === role);
  },

  // Filter Users by Status
  getUsersByStatus: (status) => {
    const { users } = get();
    if (status === 'all') return users;
    
    return users.filter(user => user.status === status);
  },

  // Clear Error
  clearError: () => {
    set({ error: null });
  },

  // Reset State
  resetState: () => {
    set({
      users: [],
      loading: false,
      error: null,
      filters: {
        role: 'all',
        status: 'all',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      },
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
      },
    });
  },
}));

export default useAdminUserStore;
