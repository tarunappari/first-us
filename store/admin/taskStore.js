// store/admin/taskStore.js
import { create } from 'zustand';
import { apiClient } from '../common/apiConfig';

const useAdminTaskStore = create((set, get) => ({
  // State
  tasks: [],
  loading: false,
  error: null,
  stats: {
    total: 0,
    pending: 0,
    'in progress': 0,
    completed: 0,
  },
  filters: {
    status: 'all',
    assignedTo: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },

  // Create Task
  createTask: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/tasks/', data);
      
      // Add new task to the list
      set((state) => ({
        tasks: [response.data, ...state.tasks],
        loading: false,
      }));

      // Recalculate stats
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Edit Task
  editTask: async (taskId, data) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.patch(`/tasks/?taskId=${taskId}`, data);
      
      // Update task in the list
      set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === taskId ? { ...task, ...response.data } : task
        ),
        loading: false,
      }));

      // Recalculate stats
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error editing task:', error);
      throw error;
    }
  },

  // Delete Task
  deleteTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.delete(`/tasks/?taskId=${taskId}`);
      
      // Remove task from the list
      set((state) => ({
        tasks: state.tasks.filter(task => task.id !== taskId),
        loading: false,
      }));

      // Recalculate stats
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Get Task Details
  getTaskDetails: async (taskId) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get(`/tasks/details`, {
        params: { taskId },
      });
      
      set({ loading: false });
      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error retrieving task details:', error);
      throw error;
    }
  },

  // Get Stats
  getStats: async (data) => {
    try {
      const response = await apiClient.post('/tasks/stats', data);
      
      set({ stats: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error getting task stats:', error);
      throw error;
    }
  },

  // Get All Tasks
  getAllTasks: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/tasks/all-tasks', data);
      
      set({ 
        tasks: response.data.tasks || response.data,
        loading: false,
        pagination: {
          ...get().pagination,
          total: response.data.total || response.data.length,
        }
      });

      // Calculate stats from loaded tasks
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error getting all tasks:', error);
      throw error;
    }
  },

  // Get Delegated Tasks
  getDelegatedTasks: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/tasks/delegated-tasks', data);
      
      set({ 
        tasks: response.data.tasks || response.data,
        loading: false,
      });

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error getting delegated tasks:', error);
      throw error;
    }
  },

  // Get Team Tasks
  getTeamTasks: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/tasks/team-tasks', data);
      
      set({ 
        tasks: response.data.tasks || response.data,
        loading: false,
      });

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error getting team tasks:', error);
      throw error;
    }
  },

  // Get Other Tasks
  getOtherTasks: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/tasks/other-tasks', data);
      
      set({ 
        tasks: response.data.tasks || response.data,
        loading: false,
      });

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error getting other tasks:', error);
      throw error;
    }
  },

  // Get Users
  getUsers: async (data) => {
    try {
      const response = await apiClient.post('/tasks/users', data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  // Add Comments
  addComments: async (data) => {
    try {
      const response = await apiClient.post('/tasks/new-comment', data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  // Calculate Stats from current tasks
  calculateStats: () => {
    const { tasks } = get();
    const stats = {
      total: tasks.length,
      pending: tasks.filter(task => task.status === 'pending').length,
      'in progress': tasks.filter(task => task.status === 'in progress').length,
      completed: tasks.filter(task => task.status === 'completed').length,
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

  // Clear Error
  clearError: () => {
    set({ error: null });
  },

  // Reset State
  resetState: () => {
    set({
      tasks: [],
      loading: false,
      error: null,
      filters: {
        status: 'all',
        assignedTo: 'all',
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

export default useAdminTaskStore;
