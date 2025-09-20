/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          bg: '#0a0a0b',
          surface: '#1a1a1d',
          card: '#252529',
          border: '#3a3a3f',
          text: {
            primary: '#ffffff',
            secondary: '#b4b4b8',
            muted: '#8a8a8f'
          }
        },
        // Light theme colors
        light: {
          bg: '#fafafa',
          surface: '#ffffff',
          card: '#f8f9fa',
          border: '#e5e7eb',
          text: {
            primary: '#1f2937',
            secondary: '#6b7280',
            muted: '#9ca3af'
          }
        },
        // Accent colors that work in both themes
        accent: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6'
        }
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #1a1a1d 0%, #252529 100%)',
        'gradient-light': 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        'gradient-accent': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      },
      boxShadow: {
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'light': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'light-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};