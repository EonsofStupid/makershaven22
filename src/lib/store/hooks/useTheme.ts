import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';

export const useTheme = () => {
  const {
    themeMode,
    setThemeMode,
    systemTheme,
    setSystemTheme,
    effectiveTheme,
    cssVariables,
    themeState,
    updateTheme,
  } = useThemeStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setSystemTheme]);

  useEffect(() => {
    // Apply CSS variables to document root
    const root = document.documentElement;
    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply theme class
    root.classList.remove('light', 'dark');
    root.classList.add(effectiveTheme);
  }, [cssVariables, effectiveTheme]);

  return {
    mode: themeMode,
    setMode: setThemeMode,
    effectiveTheme,
    settings: themeState.settings,
    isLoading: themeState.isLoading,
    error: themeState.error,
    updateTheme,
  };
};
