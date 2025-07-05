import React, { useState } from 'react';
import { Task } from '../types';
import { formatDate, isOverdue } from '../utils/storage';

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onSave: (updates: Partial<Task>) => void;
  onCancel: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isEditing,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancel
}) => {
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    dueDate: task.dueDate || ''
  });

  const handleSave = () => {
    onSave({
      title: editData.title.trim(),
      description: editData.description.trim() || undefined,
      priority: editData.priority,
      dueDate: editData.dueDate || undefined
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-white bg-high-priority';
      case 'medium': return 'text-black bg-medium-priority';
      case 'low': return 'text-white bg-low-priority';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  if (isEditing) {
    return (
      <div className="card">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              className="input"
              rows={3}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                name="priority"
                value={editData.priority}
                onChange={handleChange}
                className="input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={editData.dueDate}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn btn-success">
              Save
            </button>
            <button onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getTaskCardClass = () => {
    const baseClass = 'card task-card';
    if (task.completed) return `${baseClass} completed`;
    if (task.priority === 'high') return `${baseClass} high-priority`;
    if (task.priority === 'medium') return `${baseClass} medium-priority`;
    if (task.priority === 'low') return `${baseClass} low-priority`;
    return `${baseClass} pending`;
  };

  return (
    <div className={getTaskCardClass()}>
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="mt-1 h-4 w-4 text-primary-color rounded border-gray-300 focus:ring-primary-color"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${task.completed ? 'completed' : ''}`}>
                {task.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <span className={`${getPriorityColor(task.priority)}`}>
                {getPriorityLabel(task.priority)}
              </span>
            </div>
          </div>
          
          {task.description && (
            <div className="description-container">
              <p className={`text-base text-gray-600 ${task.completed ? 'completed' : ''}`}>
                {task.description}
              </p>
            </div>
          )}
          
          <div className="card-footer">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {task.dueDate && (
                <span className={`${isOverdue(task.dueDate) && !task.completed ? 'text-red-600 font-medium' : ''}`}>
                  Due: {formatDate(task.dueDate)}
                  {isOverdue(task.dueDate) && !task.completed && ' (Overdue)'}
                </span>
              )}
              <span>
                Created: {formatDate(task.createdAt)}
              </span>
            </div>
            <div className="action-buttons">
              <button onClick={onEdit} className="btn btn-secondary text-sm">
                Edit
              </button>
              <button onClick={handleDelete} className="btn btn-danger text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem; 