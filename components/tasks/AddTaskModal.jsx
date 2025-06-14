'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/tasks/AddTaskModal.module.scss';
import { Button } from '@/components/ui/button';

const AddTaskModal = ({ isOpen, onClose, onSubmit, editingTask, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assignedTo: '',
    status: 'pending'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        name: editingTask.name || '',
        description: editingTask.description || '',
        assignedTo: editingTask.assignedTo || '',
        status: editingTask.status || 'pending'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        assignedTo: '',
        status: 'pending'
      });
    }
    setErrors({});
  }, [editingTask, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Task name is required';
    }
    
    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assigned to field is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      ...formData,
      id: editingTask?.id || Date.now(), // Simple ID generation for demo
      createdAt: editingTask?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSubmit(taskData);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      assignedTo: '',
      status: 'pending'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.taskForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Task Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? styles.inputError : ''}
              placeholder="Enter task name"
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Enter task description (optional)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="assignedTo">Assigned To *</label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              className={errors.assignedTo ? styles.inputError : ''}
              placeholder="Enter assignee name"
            />
            {errors.assignedTo && <span className={styles.errorText}>{errors.assignedTo}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Task Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles.statusSelect}
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className={styles.modalActions}>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Saving...' : (editingTask ? 'Update Task' : 'Create Task')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
