import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';
import { ThemeMode } from '@/lib/types/core/enums';

export const useTheme = () => {
  const {
    settings,
    isLoading,
    error,
    setSettings,
    setLoading,
    setError,
    updateSettings
  } = useThemeStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (settings) {
        updateSettings({
          ...settings,
          theme_mode: e.matches ? 'dark' : 'light' as ThemeMode
        });
      }
    };

    if (settings) {
      const isDark = mediaQuery.matches;
      updateSettings({
        ...settings,
        theme_mode: isDark ? 'dark' : 'light' as ThemeMode
      });
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [settings, updateSettings]);

  useEffect(() => {
    // Apply CSS variables to document root
    if (settings) {
      const root = document.documentElement;
      Object.entries(settings).forEach(([key, value]) => {
        if (typeof value === 'string') {
          root.style.setProperty(`--${key}`, value);
        }
      });

      // Apply theme class
      root.classList.remove('light', 'dark');
      root.classList.add(settings.theme_mode);
    }
  }, [settings]);

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    setSettings,
    setError
  };
};
