import { Task } from '../types';

const STORAGE_KEY = 'personal-task-tracker-tasks';
const USERNAME_KEY = 'personal-task-tracker-username';

export const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log('Raw localStorage data:', stored);
    const parsed = stored ? JSON.parse(stored) : [];
    console.log('Parsed tasks:', parsed);
    return parsed;
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    console.log('Saving tasks to localStorage:', tasks);
    const jsonString = JSON.stringify(tasks);
    console.log('JSON string to save:', jsonString);
    localStorage.setItem(STORAGE_KEY, jsonString);
    console.log('Tasks saved successfully');
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const isOverdue = (dueDate: string): boolean => {
  return new Date(dueDate) < new Date();
};

export const saveUsername = (username: string): void => {
  try {
    localStorage.setItem(USERNAME_KEY, username);
  } catch (error) {
    console.error('Error saving username to localStorage:', error);
  }
};

export const loadUsername = (): string | null => {
  try {
    return localStorage.getItem(USERNAME_KEY);
  } catch (error) {
    console.error('Error loading username from localStorage:', error);
    return null;
  }
};

export const clearUsername = (): void => {
  try {
    localStorage.removeItem(USERNAME_KEY);
  } catch (error) {
    console.error('Error clearing username from localStorage:', error);
  }
}; 