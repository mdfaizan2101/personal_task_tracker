import React, { useState, useEffect } from 'react';
import { Task, TaskFilters as TaskFiltersType } from './types';
import { loadTasks, saveTasks, loadUsername, saveUsername, clearUsername } from './utils/storage';
import { getStoredTheme, saveTheme, applyTheme, Theme } from './utils/theme';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import Login from './components/Login';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [filters, setFilters] = useState<TaskFiltersType>({
    status: 'all',
    priority: 'all',
    search: ''
  });

  useEffect(() => {
    const savedTasks = loadTasks();
    console.log('Loading tasks from localStorage:', savedTasks);
    setTasks(savedTasks);
    
    // Check if user is already logged in
    const savedUsername = loadUsername();
    if (savedUsername) {
      setUsername(savedUsername);
    }
    
    // Load saved theme
    const savedTheme = getStoredTheme();
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Only save if we have tasks and we're not in the initial load
    if (tasks.length > 0) {
      console.log('Saving tasks to localStorage:', tasks);
      saveTasks(tasks);
    }
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks((prev: any) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev: any) => prev.map((task: any) =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks((prev: any) => prev.filter((task: any) => task.id !== id));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev: any) => prev.map((task: any) =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const filteredTasks = tasks.filter((task: any) => {
    const matchesStatus = filters.status === 'all' ||
      (filters.status === 'completed' && task.completed) ||
      (filters.status === 'pending' && !task.completed);
    
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(filters.search.toLowerCase()));
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const completedCount = tasks.filter((task: any) => task.completed).length;
  const totalCount = tasks.length;

  const handleLogin = (newUsername: string) => {
    saveUsername(newUsername);
    setUsername(newUsername);
  };

  const handleLogout = () => {
    clearUsername();
    setUsername(null);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    saveTheme(newTheme);
    applyTheme(newTheme);
  };



  // Show login screen if not logged in
  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <div>
              <h1>Personal Task Tracker</h1>
              <p className="welcome-text">Welcome back, {username}!</p>
            </div>
            <div className="header-actions">
              <ThemeToggle theme={theme} onThemeChange={handleThemeChange} />
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          </div>
          <div className="stats">
            <span className="stat">
              {completedCount} of {totalCount} tasks completed
            </span>
            {totalCount > 0 && (
              <span className="stat">
                {Math.round((completedCount / totalCount) * 100)}% complete
              </span>
            )}
          </div>
        </header>

        <main className="app-main">
          <div className="sidebar">
            <TaskForm onAddTask={addTask} />
            <TaskFilters filters={filters} onFiltersChange={setFilters} tasks={tasks} />
          </div>
          
          <div className="content">
            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onUpdateTask={updateTask}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App; 