'use client';
import React from 'react';
import styles from '@/styles/tasks/TasksTable.module.scss';
import { Button } from '@/components/ui/button';

const TasksTable = ({ tasks, onEditTask, onDeleteTask, loading }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return '#ef4444'; // Red
      case 'in progress':
        return '#f59e0b'; // Yellow
      case 'completed':
        return '#10b981'; // Green
      default:
        return '#6b7280'; // Gray
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return styles.statusPending;
      case 'in progress':
        return styles.statusInProgress;
      case 'completed':
        return styles.statusCompleted;
      default:
        return styles.statusDefault;
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <h3>No tasks found</h3>
        <p>Get started by creating your first task!</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.tasksTable}>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className={styles.taskRow}>
                <td className={styles.taskName}>
                  <div className={styles.taskNameContent}>
                    <span className={styles.taskTitle}>{task.name}</span>
                  </div>
                </td>
                <td className={styles.taskDescription}>
                  <div className={styles.descriptionContent}>
                    {task.description || 'No description'}
                  </div>
                </td>
                <td className={styles.assignedTo}>
                  <div className={styles.assigneeInfo}>
                    <div className={styles.assigneeAvatar}>
                      {task.assignedTo ? task.assignedTo.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span>{task.assignedTo || 'Unassigned'}</span>
                  </div>
                </td>
                <td className={styles.taskStatus}>
                  <span 
                    className={`${styles.statusBadge} ${getStatusBadgeClass(task.status)}`}
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  >
                    {task.status || 'Pending'}
                  </span>
                </td>
                <td className={styles.createdDate}>
                  {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className={styles.actions}>
                  <div className={styles.actionButtons}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditTask(task)}
                      className={styles.editBtn}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteTask(task.id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksTable;
