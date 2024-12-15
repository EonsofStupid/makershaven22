import { atom } from 'jotai';
import type { Settings, Theme, ThemeMode } from '@/lib/types/base';
import { useThemeStore } from '../../theme-store';

// Base theme atom with storage
export const themeSettingsAtom = atom<Theme | null>(null);

// Mode management
export const themeModeAtom = atom<ThemeMode>('system');

// System theme detection
export const systemThemeAtom = atom<'light' | 'dark'>('dark');

// Computed effective theme
export const effectiveThemeAtom = atom(
  (get) => {
    const mode = get(themeModeAtom);
    const systemTheme = get(systemThemeAtom);
    return mode === 'system' ? systemTheme : mode;
  }
);

// Sync with Zustand store
export const syncWithZustandAtom = atom(
  null,
  (get, set, theme: Theme) => {
    if (theme?.settings) {
      useThemeStore.getState().updateSettings(theme.settings);
    }
  }
);