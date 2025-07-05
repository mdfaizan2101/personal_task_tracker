import React from 'react';
import { TaskFilters as TaskFiltersType, Task } from '../types';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
  tasks: Task[];
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onFiltersChange, tasks }) => {
  const handleChange = (field: keyof TaskFiltersType, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const getTaskCounts = () => {
    const all = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.filter(task => !task.completed).length;
    return { all, completed, pending };
  };

  const counts = getTaskCounts();

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e: any) => handleChange('search', e.target.value)}
            className="input"
            placeholder="Search tasks..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => handleChange('status', 'all')}
              className={`filter-tab ${filters.status === 'all' ? 'active' : ''}`}
            >
              All ({counts.all})
            </button>
            <button
              onClick={() => handleChange('status', 'pending')}
              className={`filter-tab ${filters.status === 'pending' ? 'active' : ''}`}
            >
              Pending ({counts.pending})
            </button>
            <button
              onClick={() => handleChange('status', 'completed')}
              className={`filter-tab ${filters.status === 'completed' ? 'active' : ''}`}
            >
              Completed ({counts.completed})
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Priority</label>
          <select
            value={filters.priority}
            onChange={(e: any) => handleChange('priority', e.target.value)}
            className="input"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button
          onClick={() => onFiltersChange({ status: 'all', priority: 'all', search: '' })}
          className="btn btn-secondary"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default TaskFilters; 