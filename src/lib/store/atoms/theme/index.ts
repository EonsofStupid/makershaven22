import { atom } from 'jotai';
import type { Settings } from '@/lib/types/settings';
import { useThemeStore } from '../../theme-store';

// Read-only atom that syncs with Zustand theme store
export const themeSettingsAtom = atom<Settings | null>(
  (get) => useThemeStore.getState().settings
);

// Writable atom for theme mode
export const themeModeAtom = atom<'light' | 'dark' | 'system'>(
  (get) => useThemeStore.getState().mode,
  (get, set, newMode: 'light' | 'dark' | 'system') => {
    useThemeStore.getState().setMode(newMode);
  }
);

// Computed atom for effective theme based on system preference
export const effectiveThemeAtom = atom((get) => {
  const mode = get(themeModeAtom);
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return mode;
});