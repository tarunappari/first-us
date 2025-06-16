// store/users/taskStore.js
import { create } from 'zustand';
import { apiClient } from '../common/apiConfig';

const useUserTaskStore = create((set, get) => ({
  // State
  myTasks: [],
  loading: false,
  error: null,
  stats: {
    total: 0,
    pending: 0,
    'in progress': 0,
    completed: 0,
    overdue: 0,
    todayTasks: 0,
  },
  filters: {
    status: 'all',
    priority: 'all',
    dueDate: 'all',
    sortBy: 'dueDate',
    sortOrder: 'asc',
  },

  // Get Your Tasks (assigned to current user)
  getYourTasks: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/tasks/your-tasks', data);
      
      set({ 
        myTasks: response.data.tasks || response.data,
        loading: false,
      });

      // Calculate stats
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error getting your tasks:', error);
      throw error;
    }
  },

  // Update Task Status
  updateTaskStatus: async (taskId, status) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.patch(`/tasks/status`, {
        taskId,
        status,
      });
      
      // Update task status in the list
      set((state) => ({
        myTasks: state.myTasks.map(task => 
          task.id === taskId ? { ...task, status } : task
        ),
        loading: false,
      }));

      // Recalculate stats
      get().calculateStats();

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error updating task status:', error);
      throw error;
    }
  },

  // Update Task Progress
  updateTaskProgress: async (taskId, progress) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.patch(`/tasks/progress`, {
        taskId,
        progress,
      });
      
      // Update task progress in the list
      set((state) => ({
        myTasks: state.myTasks.map(task => 
          task.id === taskId ? { ...task, progress } : task
        ),
        loading: false,
      }));

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error updating task progress:', error);
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

  // Add Comments to Task
  addComments: async (data) => {
    try {
      const response = await apiClient.post('/tasks/new-comment', data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  // Mark Task as Started
  startTask: async (taskId) => {
    return get().updateTaskStatus(taskId, 'in progress');
  },

  // Mark Task as Completed
  completeTask: async (taskId) => {
    return get().updateTaskStatus(taskId, 'completed');
  },

  // Request Task Extension
  requestExtension: async (taskId, newDueDate, reason) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/tasks/request-extension', {
        taskId,
        newDueDate,
        reason,
      });
      
      set({ loading: false });
      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error requesting extension:', error);
      throw error;
    }
  },

  // Submit Task for Review
  submitForReview: async (taskId, notes = '') => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.patch('/tasks/submit-review', {
        taskId,
        notes,
      });
      
      // Update task status in the list
      set((state) => ({
        myTasks: state.myTasks.map(task => 
          task.id === taskId ? { ...task, status: 'under_review' } : task
        ),
        loading: false,
      }));

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error submitting for review:', error);
      throw error;
    }
  },

  // Upload Task Attachment
  uploadAttachment: async (taskId, file) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('taskId', taskId);

      const response = await apiClient.post('/tasks/upload-attachment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      set({ loading: false });
      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error uploading attachment:', error);
      throw error;
    }
  },

  // Log Time Spent on Task
  logTimeSpent: async (taskId, timeSpent, description = '') => {
    try {
      const response = await apiClient.post('/tasks/log-time', {
        taskId,
        timeSpent,
        description,
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error logging time:', error);
      throw error;
    }
  },

  // Calculate Stats from current tasks
  calculateStats: () => {
    const { myTasks } = get();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    const stats = {
      total: myTasks.length,
      pending: myTasks.filter(task => task.status === 'pending').length,
      'in progress': myTasks.filter(task => task.status === 'in progress').length,
      completed: myTasks.filter(task => task.status === 'completed').length,
      overdue: myTasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate < now && task.status !== 'completed';
      }).length,
      todayTasks: myTasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && dueDate < tomorrow;
      }).length,
    };
    
    set({ stats });
    return stats;
  },

  // Set Filters
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  // Get Filtered Tasks
  getFilteredTasks: () => {
    const { myTasks, filters } = get();
    let filteredTasks = [...myTasks];

    // Filter by status
    if (filters.status !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }

    // Filter by priority
    if (filters.priority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
    }

    // Filter by due date
    if (filters.dueDate !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      switch (filters.dueDate) {
        case 'today':
          filteredTasks = filteredTasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate < tomorrow;
          });
          break;
        case 'this_week':
          filteredTasks = filteredTasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate < nextWeek;
          });
          break;
        case 'overdue':
          filteredTasks = filteredTasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate < now && task.status !== 'completed';
          });
          break;
      }
    }

    // Sort tasks
    filteredTasks.sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filteredTasks;
  },

  // Get Today's Tasks
  getTodayTasks: () => {
    const { myTasks } = get();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    return myTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return dueDate >= today && dueDate < tomorrow;
    });
  },

  // Get Overdue Tasks
  getOverdueTasks: () => {
    const { myTasks } = get();
    const now = new Date();
    
    return myTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return dueDate < now && task.status !== 'completed';
    });
  },

  // Get Completed Tasks
  getCompletedTasks: () => {
    const { myTasks } = get();
    return myTasks.filter(task => task.status === 'completed');
  },

  // Clear Error
  clearError: () => {
    set({ error: null });
  },

  // Reset State
  resetState: () => {
    set({
      myTasks: [],
      loading: false,
      error: null,
      filters: {
        status: 'all',
        priority: 'all',
        dueDate: 'all',
        sortBy: 'dueDate',
        sortOrder: 'asc',
      },
    });
  },
}));

export default useUserTaskStore;
