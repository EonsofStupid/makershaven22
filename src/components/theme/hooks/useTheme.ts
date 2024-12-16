import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { 
  themeModeAtom, 
  systemThemeAtom, 
  effectiveThemeAtom,
  themeSettingsAtom,
  updateThemeAtom
} from '@/lib/store/atoms/theme';
import { useThemeStore } from '@/lib/store/theme-store';
import type { Settings, ThemeMode } from '@/lib/types/settings';

export const useTheme = () => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  const [, setSystemTheme] = useAtom(systemThemeAtom);
  const effectiveTheme = useAtomValue(effectiveThemeAtom);
  const [themeSettings] = useAtom(themeSettingsAtom);
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

  const updateSettings = async (updates: Settings) => {
    await updateTheme(updates);
    updateStoreSettings(updates);
  };

  return {
    mode: themeMode,
    setMode,
    effectiveTheme,
    settings: themeSettings?.settings || null,
    isLoading,
    error,
    updateSettings
  };
};