import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { 
  themeModeAtom, 
  systemThemeAtom, 
  effectiveThemeAtom,
  themeAtom,
  updateThemeAtom
} from '@/lib/store/atoms/theme/theme-atoms';
import { useThemeStore } from '@/lib/store/theme-store';
import type { ThemeMode, Settings } from '@/lib/types/settings';

export const useTheme = () => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  const [, setSystemTheme] = useAtom(systemThemeAtom);
  const effectiveTheme = useAtomValue(effectiveThemeAtom);
  const [theme] = useAtom(themeAtom);
  const [, updateTheme] = useAtom(updateThemeAtom);
  
  const { 
    isLoading, 
    error,
    setMode: setStoreMode,
    updateSettings: updateStoreSettings
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

  const setMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    setStoreMode(mode);
  };

  const updateSettings = async (updates: Partial<Settings>) => {
    if (!theme?.settings) return;
    await updateTheme(updates);
    updateStoreSettings(updates);
  };

  return {
    mode: themeMode,
    setMode,
    effectiveTheme,
    settings: theme?.settings,
    isLoading,
    error,
    updateSettings
  };
};