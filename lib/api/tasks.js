// Mock API functions for task management
// Replace these with actual API calls to your backend

const MOCK_TASKS = [
  {
    id: 1,
    name: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the new homepage design',
    assignedTo: 'John Doe',
    status: 'in progress',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Implement User Authentication',
    description: 'Set up login, registration, and password reset functionality',
    assignedTo: 'Jane Smith',
    status: 'pending',
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },
  {
    id: 3,
    name: 'Database Migration',
    description: 'Migrate user data from old system to new database structure',
    assignedTo: 'Mike Johnson',
    status: 'completed',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-16T16:45:00Z'
  },
  {
    id: 4,
    name: 'API Documentation',
    description: 'Write comprehensive documentation for all API endpoints',
    assignedTo: 'Sarah Wilson',
    status: 'pending',
    createdAt: '2024-01-12T11:20:00Z',
    updatedAt: '2024-01-12T11:20:00Z'
  },
  {
    id: 5,
    name: 'Mobile App Testing',
    description: 'Conduct thorough testing on iOS and Android devices',
    assignedTo: 'David Brown',
    status: 'in progress',
    createdAt: '2024-01-11T13:45:00Z',
    updatedAt: '2024-01-15T08:30:00Z'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get all tasks
export const fetchTasks = async () => {
  try {
    await delay(800); // Simulate network delay
    
    // In a real app, this would be:
    // const response = await fetch('/api/tasks');
    // const tasks = await response.json();
    // return tasks;
    
    return MOCK_TASKS;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    await delay(500);
    
    // In a real app, this would be:
    // const response = await fetch('/api/tasks', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(taskData)
    // });
    // const newTask = await response.json();
    // return newTask;
    
    const newTask = {
      ...taskData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    MOCK_TASKS.push(newTask);
    return newTask;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
};

// Update an existing task
export const updateTask = async (taskId, taskData) => {
  try {
    await delay(500);
    
    // In a real app, this would be:
    // const response = await fetch(`/api/tasks/${taskId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(taskData)
    // });
    // const updatedTask = await response.json();
    // return updatedTask;
    
    const taskIndex = MOCK_TASKS.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask = {
      ...MOCK_TASKS[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString()
    };
    
    MOCK_TASKS[taskIndex] = updatedTask;
    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    await delay(300);
    
    // In a real app, this would be:
    // const response = await fetch(`/api/tasks/${taskId}`, {
    //   method: 'DELETE'
    // });
    // return response.ok;
    
    const taskIndex = MOCK_TASKS.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    MOCK_TASKS.splice(taskIndex, 1);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
};

// Get task statistics
export const getTaskStats = async () => {
  try {
    await delay(300);
    
    const stats = MOCK_TASKS.reduce((acc, task) => {
      const status = task.status.toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    
    return {
      total: MOCK_TASKS.length,
      pending: stats.pending || 0,
      'in progress': stats['in progress'] || 0,
      completed: stats.completed || 0
    };
  } catch (error) {
    console.error('Error fetching task stats:', error);
    throw new Error('Failed to fetch task statistics');
  }
};
