import React, { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';
import type { Settings } from '@/components/admin/settings/types';
import { toast } from 'sonner';
import { applyThemeToDocument } from './utils/themeUtils';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { settings, mode, setMode, updateTheme } = useThemeStore();

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (mode === 'system') {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    if (mode === 'system') {
      setMode(mediaQuery.matches ? 'dark' : 'light');
    }
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode, setMode]);

  // Apply theme settings to document
  useEffect(() => {
    if (settings) {
      applyThemeToDocument(settings);
      document.documentElement.classList.toggle('dark', mode === 'dark');
    }
  }, [settings, mode]);

  const handleThemeUpdate = async (newTheme: Settings) => {
    try {
      await updateTheme(newTheme);
      toast.success('Theme updated successfully');
    } catch (error) {
      console.error('Error updating theme:', error);
      toast.error('Failed to update theme');
    }
  };

  return <>{children}</>;
};
