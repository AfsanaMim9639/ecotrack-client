import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log('Theme toggle clicked. Current:', isDark ? 'dark' : 'light');
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[9999] p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-600 group hover:scale-110"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{ position: 'fixed', bottom: '24px', right: '24px' }}
    >
      <div className="relative w-6 h-6">
        {isDark ? (
          <FaSun 
            className="w-6 h-6 text-yellow-400 group-hover:rotate-180 transition-transform duration-500 absolute inset-0" 
          />
        ) : (
          <FaMoon 
            className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:-rotate-12 transition-transform duration-300 absolute inset-0" 
          />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;