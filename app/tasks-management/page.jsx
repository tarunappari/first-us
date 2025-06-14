'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import TasksTable from '@/components/tasks/TasksTable';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import styles from '@/styles/tasks/TaskManagement.module.scss';
import { fetchTasks, createTask, updateTask, deleteTask, getTaskStats } from '@/lib/api/tasks';

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Load tasks and stats on component mount
  useEffect(() => {
    loadTasksAndStats();
  }, []);

  const loadTasksAndStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const [tasksData, statsData] = await Promise.all([
        fetchTasks(),
        getTaskStats()
      ]);

      setTasks(tasksData);
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadTasksAndStats();
    } catch (err) {
      setError(err.message || 'Failed to refresh tasks');
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmitTask = async (taskData) => {
    try {
      setSubmitting(true);

      if (editingTask) {
        // Update existing task
        const updatedTask = await updateTask(editingTask.id, taskData);
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === editingTask.id ? updatedTask : task
          )
        );
      } else {
        // Create new task
        const newTask = await createTask(taskData);
        setTasks(prevTasks => [...prevTasks, newTask]);
      }

      // Refresh stats
      const statsData = await getTaskStats();
      setStats(statsData);

      handleCloseModal();
    } catch (err) {
      setError(err.message || 'Failed to save task');
      console.error('Error saving task:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

      // Refresh stats
      const statsData = await getTaskStats();
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className={styles.taskManagement}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Task Management</h1>
            <p>Manage and track your team's tasks and progress</p>
          </div>
          <div className={styles.headerActions}>
            <button
              className={`${styles.refreshButton} ${refreshing ? styles.refreshing : ''}`}
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh tasks"
            >
              <span className={styles.refreshIcon}>↻</span>
            </button>
            <button
              className={styles.addTaskButton}
              onClick={handleAddTask}
            >
              <span className={styles.addIcon}>+</span>
              Add Task
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            <span className={styles.errorText}>{error}</span>
            <button
              className={styles.retryButton}
              onClick={loadTasksAndStats}
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={`${styles.statCard} ${styles.total}`}>
              <div className={styles.statHeader}>
                <div className={styles.statIcon}>📊</div>
                <div className={styles.statInfo}>
                  <h3>{stats.total || 0}</h3>
                  <p>Total Tasks</p>
                </div>
              </div>
            </div>
            <div className={`${styles.statCard} ${styles.pending}`}>
              <div className={styles.statHeader}>
                <div className={styles.statIcon}>⏳</div>
                <div className={styles.statInfo}>
                  <h3>{stats.pending || 0}</h3>
                  <p>Pending Tasks</p>
                </div>
              </div>
            </div>
            <div className={`${styles.statCard} ${styles.inProgress}`}>
              <div className={styles.statHeader}>
                <div className={styles.statIcon}>🔄</div>
                <div className={styles.statInfo}>
                  <h3>{stats['in progress'] || 0}</h3>
                  <p>In Progress</p>
                </div>
              </div>
            </div>
            <div className={`${styles.statCard} ${styles.completed}`}>
              <div className={styles.statHeader}>
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statInfo}>
                  <h3>{stats.completed || 0}</h3>
                  <p>Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className={styles.tasksSection}>
          <div className={styles.sectionHeader}>
            <h2>All Tasks</h2>
            <span className={styles.taskCount}>
              {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </span>
          </div>

          <TasksTable
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            loading={loading}
          />
        </div>

        {/* Add/Edit Task Modal */}
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitTask}
          editingTask={editingTask}
          loading={submitting}
        />
      </div>
    </div>
  );
};

export default TaskManagementPage;