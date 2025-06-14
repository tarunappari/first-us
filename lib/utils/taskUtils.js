// Task utility functions

export const TASK_STATUSES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in progress',
  COMPLETED: 'completed'
};

export const TASK_STATUS_COLORS = {
  [TASK_STATUSES.PENDING]: '#ef4444',      // Red
  [TASK_STATUSES.IN_PROGRESS]: '#f59e0b',  // Yellow
  [TASK_STATUSES.COMPLETED]: '#10b981'     // Green
};

export const TASK_STATUS_LABELS = {
  [TASK_STATUSES.PENDING]: 'Pending',
  [TASK_STATUSES.IN_PROGRESS]: 'In Progress',
  [TASK_STATUSES.COMPLETED]: 'Completed'
};

/**
 * Get the color for a task status
 * @param {string} status - The task status
 * @returns {string} - The hex color code
 */
export const getTaskStatusColor = (status) => {
  return TASK_STATUS_COLORS[status?.toLowerCase()] || '#6b7280';
};

/**
 * Get the display label for a task status
 * @param {string} status - The task status
 * @returns {string} - The formatted label
 */
export const getTaskStatusLabel = (status) => {
  return TASK_STATUS_LABELS[status?.toLowerCase()] || status || 'Unknown';
};

/**
 * Get all available task statuses
 * @returns {Array} - Array of status objects with value and label
 */
export const getTaskStatusOptions = () => {
  return Object.values(TASK_STATUSES).map(status => ({
    value: status,
    label: TASK_STATUS_LABELS[status],
    color: TASK_STATUS_COLORS[status]
  }));
};

/**
 * Validate task data
 * @param {Object} taskData - The task data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateTaskData = (taskData) => {
  const errors = {};
  
  if (!taskData.name || !taskData.name.trim()) {
    errors.name = 'Task name is required';
  }
  
  if (!taskData.assignedTo || !taskData.assignedTo.trim()) {
    errors.assignedTo = 'Assigned to field is required';
  }
  
  if (taskData.status && !Object.values(TASK_STATUSES).includes(taskData.status.toLowerCase())) {
    errors.status = 'Invalid task status';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Format task for display
 * @param {Object} task - The raw task object
 * @returns {Object} - Formatted task object
 */
export const formatTask = (task) => {
  return {
    ...task,
    status: task.status?.toLowerCase() || TASK_STATUSES.PENDING,
    statusLabel: getTaskStatusLabel(task.status),
    statusColor: getTaskStatusColor(task.status),
    createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
    updatedAt: task.updatedAt ? new Date(task.updatedAt) : new Date()
  };
};

/**
 * Sort tasks by various criteria
 * @param {Array} tasks - Array of tasks
 * @param {string} sortBy - Sort criteria (name, status, createdAt, assignedTo)
 * @param {string} sortOrder - Sort order (asc, desc)
 * @returns {Array} - Sorted tasks array
 */
export const sortTasks = (tasks, sortBy = 'createdAt', sortOrder = 'desc') => {
  return [...tasks].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle date sorting
    if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    // Handle string sorting
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

/**
 * Filter tasks by status
 * @param {Array} tasks - Array of tasks
 * @param {string} status - Status to filter by
 * @returns {Array} - Filtered tasks array
 */
export const filterTasksByStatus = (tasks, status) => {
  if (!status) return tasks;
  return tasks.filter(task => task.status?.toLowerCase() === status.toLowerCase());
};

/**
 * Get task statistics
 * @param {Array} tasks - Array of tasks
 * @returns {Object} - Task statistics
 */
export const calculateTaskStats = (tasks) => {
  const stats = tasks.reduce((acc, task) => {
    const status = task.status?.toLowerCase() || TASK_STATUSES.PENDING;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  
  return {
    total: tasks.length,
    pending: stats[TASK_STATUSES.PENDING] || 0,
    'in progress': stats[TASK_STATUSES.IN_PROGRESS] || 0,
    completed: stats[TASK_STATUSES.COMPLETED] || 0,
    completionRate: tasks.length > 0 ? 
      Math.round((stats[TASK_STATUSES.COMPLETED] || 0) / tasks.length * 100) : 0
  };
};
