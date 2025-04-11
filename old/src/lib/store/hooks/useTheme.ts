
import { useEffect } from 'react';
import { useThemeStore, initializeThemeStore } from '@/lib/store/theme-store';
import { ThemeMode } from '@/lib/types/core/enums';

export const useTheme = () => {
  const { 
    settings,
    isLoading,
    error,
    themeMode,
    effectiveTheme,
    setSettings,
    setThemeMode,
    updateSettings
  } = useThemeStore();

  // Initialize theme on first render
  useEffect(() => {
    initializeThemeStore();
  }, []);

  // Apply theme mode to document
  useEffect(() => {
    if (typeof document !== 'undefined' && effectiveTheme) {
      // Remove all theme classes
      document.documentElement.classList.remove('light', 'dark');
      // Add current theme class
      document.documentElement.classList.add(effectiveTheme);
    }
  }, [effectiveTheme]);

  return {
    // Data
    settings,
    isLoading,
    error,
    themeMode,
    effectiveTheme,
    
    // Actions
    setThemeMode,
    updateSettings,
    
    // Helpers
    toggleTheme: () => {
      const newMode: ThemeMode = themeMode === 'dark' ? 'light' : 'dark';
      setThemeMode(newMode);
    }
  };
};
