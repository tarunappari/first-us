// store/employers/taskStore.js
import { create } from 'zustand';
import { apiClient } from '../common/apiConfig';

const useEmployerTaskStore = create((set, get) => ({
  // State
  tasks: [],
  teamTasks: [],
  delegatedTasks: [],
  loading: false,
  error: null,
  stats: {
    total: 0,
    pending: 0,
    'in progress': 0,
    completed: 0,
    overdue: 0,
  },
  filters: {
    status: 'all',
    assignedTo: 'all',
    priority: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },

  // Get Your Tasks (as employer)
  getYourTasks: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/tasks/your-tasks', data);
      
      set({ 
        tasks: response.data.tasks || response.data,
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

  // Get Team Tasks
  getTeamTasks: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/tasks/team-tasks', data);
      
      set({ 
        teamTasks: response.data.tasks || response.data,
        loading: false,
      });

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error getting team tasks:', error);
      throw error;
    }
  },

  // Get Delegated Tasks
  getDelegatedTasks: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/tasks/delegated-tasks', data);
      
      set({ 
        delegatedTasks: response.data.tasks || response.data,
        loading: false,
      });

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error getting delegated tasks:', error);
      throw error;
    }
  },

  // Create Task
  createTask: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/tasks/', data);
      
      // Add new task to the appropriate list
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
      
      // Update task in all relevant lists
      const updateTaskInList = (tasks) => 
        tasks.map(task => task.id === taskId ? { ...task, ...response.data } : task);

      set((state) => ({
        tasks: updateTaskInList(state.tasks),
        teamTasks: updateTaskInList(state.teamTasks),
        delegatedTasks: updateTaskInList(state.delegatedTasks),
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
      
      // Remove task from all lists
      const removeTaskFromList = (tasks) => tasks.filter(task => task.id !== taskId);

      set((state) => ({
        tasks: removeTaskFromList(state.tasks),
        teamTasks: removeTaskFromList(state.teamTasks),
        delegatedTasks: removeTaskFromList(state.delegatedTasks),
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

  // Assign Task to Team Member
  assignTask: async (taskId, assigneeId) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.patch(`/tasks/assign`, {
        taskId,
        assigneeId,
      });
      
      // Update task assignment in all lists
      const updateAssignment = (tasks) => 
        tasks.map(task => 
          task.id === taskId ? { ...task, assignedTo: assigneeId } : task
        );

      set((state) => ({
        tasks: updateAssignment(state.tasks),
        teamTasks: updateAssignment(state.teamTasks),
        delegatedTasks: updateAssignment(state.delegatedTasks),
        loading: false,
      }));

      return { success: true, data: response.data };
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error assigning task:', error);
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
      
      // Update task status in all lists
      const updateStatus = (tasks) => 
        tasks.map(task => 
          task.id === taskId ? { ...task, status } : task
        );

      set((state) => ({
        tasks: updateStatus(state.tasks),
        teamTasks: updateStatus(state.teamTasks),
        delegatedTasks: updateStatus(state.delegatedTasks),
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

  // Get Team Members
  getTeamMembers: async (data) => {
    try {
      const response = await apiClient.post('/tasks/users', data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error getting team members:', error);
      throw error;
    }
  },

  // Calculate Stats from current tasks
  calculateStats: () => {
    const { tasks } = get();
    const now = new Date();
    
    const stats = {
      total: tasks.length,
      pending: tasks.filter(task => task.status === 'pending').length,
      'in progress': tasks.filter(task => task.status === 'in progress').length,
      completed: tasks.filter(task => task.status === 'completed').length,
      overdue: tasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate < now && task.status !== 'completed';
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
    const { tasks, filters } = get();
    let filteredTasks = [...tasks];

    // Filter by status
    if (filters.status !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }

    // Filter by assigned user
    if (filters.assignedTo !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.assignedTo === filters.assignedTo);
    }

    // Filter by priority
    if (filters.priority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
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

  // Clear Error
  clearError: () => {
    set({ error: null });
  },

  // Reset State
  resetState: () => {
    set({
      tasks: [],
      teamTasks: [],
      delegatedTasks: [],
      loading: false,
      error: null,
      filters: {
        status: 'all',
        assignedTo: 'all',
        priority: 'all',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      },
    });
  },
}));

export default useEmployerTaskStore;
