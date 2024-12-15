import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { 
  themeModeAtom, 
  systemThemeAtom, 
  effectiveThemeAtom,
  themeAtom,
  updateThemeAtom
} from '@/lib/store/atoms/theme';
import { useSyncedStore } from '@/lib/store/hooks/useSyncedStore';
import type { Settings } from '@/lib/types/settings';

export const useTheme = () => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  const [, setSystemTheme] = useAtom(systemThemeAtom);
  const effectiveTheme = useAtomValue(effectiveThemeAtom);
  const [theme] = useAtom(themeAtom);
  const [, updateTheme] = useAtom(updateThemeAtom);
  const { state, setState } = useSyncedStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setSystemTheme]);

  const setMode = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
    setState({ mode });
  };

  const updateSettings = async (updates: Settings) => {
    await updateTheme(updates);
    setState({ settings: updates });
  };

  return {
    mode: themeMode,
    setMode,
    effectiveTheme,
    settings: theme?.settings || null,
    isLoading: state.isThemeLoading,
    error: state.themeError,
    updateSettings
  };
};