import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to light
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('ecotrack-theme');
      return saved === 'dark';
    } catch (error) {
      return false;
    }
  });

  // Apply theme changes to DOM
  useEffect(() => {
    try {
      const root = document.documentElement;
      
      if (isDark) {
        root.classList.add('dark');
        localStorage.setItem('ecotrack-theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('ecotrack-theme', 'light');
      }
      
      console.log('Theme changed to:', isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const value = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};