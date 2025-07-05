export type Theme = 'light' | 'dark';

const THEME_KEY = 'personal-task-tracker-theme';

export const getStoredTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return (stored as Theme) || 'light';
  } catch (error) {
    console.error('Error loading theme from localStorage:', error);
    return 'light';
  }
};

export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};

export const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}; 