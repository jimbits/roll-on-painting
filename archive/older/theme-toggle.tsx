'use client';

import { useIsDarkMode, useTheme, useThemeActions } from '@/store/theme-store';
import { useEffect } from 'react';

export function ThemeToggle() {
  // Method 1: Using individual selectors (RECOMMENDED - better performance)
  const theme = useTheme();
  const isDarkMode = useIsDarkMode();
  const { setTheme, toggleTheme, initializeTheme } = useThemeActions();

  // Method 2: Using the full store (less optimal - causes more re-renders)
  // const { theme, isDarkMode, setTheme, toggleTheme, initializeTheme } = useThemeStore()

  // Method 3: Using selective store access (good middle ground)
  // const theme = useThemeStore((state) => state.theme)
  // const isDarkMode = useThemeStore((state) => state.isDarkMode)
  // const setTheme = useThemeStore((state) => state.setTheme)

  // Initialize theme on component mount
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <div className='flex flex-col gap-4 p-4 border rounded-lg'>
      <h3 className='text-lg font-semibold'>Theme Controls</h3>

      {/* Current state display */}
      <div className='text-sm text-gray-600'>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <p>
          Dark mode active: <strong>{isDarkMode ? 'Yes' : 'No'}</strong>
        </p>
      </div>

      {/* Theme selection buttons */}
      <div className='flex gap-2'>
        <button
          onClick={() => setTheme('light')}
          className={`px-3 py-2 rounded text-sm ${
            theme === 'light'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Light
        </button>

        <button
          onClick={() => setTheme('dark')}
          className={`px-3 py-2 rounded text-sm ${
            theme === 'dark'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Dark
        </button>

        <button
          onClick={() => setTheme('system')}
          className={`px-3 py-2 rounded text-sm ${
            theme === 'system'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          System
        </button>
      </div>

      {/* Quick toggle button */}
      <button
        onClick={toggleTheme}
        className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
      >
        Toggle Light/Dark
      </button>
    </div>
  );
}
