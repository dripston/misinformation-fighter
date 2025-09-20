import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-surface transition-all duration-200 group"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-accent-warning transition-colors" />
      ) : (
        <Moon className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-accent-primary transition-colors" />
      )}
    </button>
  );
}