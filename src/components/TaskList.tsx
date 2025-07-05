import React, { useState } from 'react';
import { Task } from '../types';
import { formatDate, isOverdue } from '../utils/storage';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onUpdateTask
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string, updates: Partial<Task>) => {
    onUpdateTask(id, updates);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-500 mb-2">No tasks found</h3>
          <p className="text-sm text-gray-500">
            Add a new task to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={() => handleEdit(task.id)}
          onSave={(updates) => handleSave(task.id, updates)}
          onCancel={handleCancel}
        />
      ))}
    </div>
  );
};

export default TaskList; 