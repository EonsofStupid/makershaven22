import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { ThemeSettings, ThemeMode } from '@/lib/types/theme';

export const useTheme = () => {
  const { 
    theme,
    mode,
    settings,
    isLoading,
    error,
    setTheme,
    setMode,
    updateSettings,
    setError
  } = useThemeStore();

  // Handle system theme changes
  useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle('dark', e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      document.documentElement.classList.toggle('dark', mediaQuery.matches);

      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode]);

  // Sync with Supabase
  const saveSettings = async (newSettings: Partial<ThemeSettings>) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update(newSettings)
        .single();

      if (error) throw error;
      
      updateSettings(newSettings);
      toast.success('Theme settings updated');
    } catch (err) {
      console.error('Failed to save theme settings:', err);
      setError(err as Error);
      toast.error('Failed to save theme settings');
    }
  };

  return {
    theme,
    mode,
    settings,
    isLoading,
    error,
    setMode,
    updateSettings: saveSettings
  };
};