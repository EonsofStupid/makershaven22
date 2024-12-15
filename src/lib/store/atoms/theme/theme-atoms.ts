import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';
import { useThemeStore } from '../../theme-store';

// Base theme atom with storage
export const themeAtom = atomWithStorage<Theme | null>('theme', null);

// Mode management with storage persistence
export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');

// System theme detection
export const systemThemeAtom = atom<'light' | 'dark'>('dark');

// Computed effective theme
export const effectiveThemeAtom = atom(
  (get) => {
    const themeMode = get(themeModeAtom);
    const systemTheme = get(systemThemeAtom);
    return themeMode === 'system' ? systemTheme : themeMode;
  }
);

// Writable derived atom for theme updates
export const updateThemeAtom = atom(
  (get) => get(themeAtom),
  (get, set, updates: Partial<Settings>) => {
    const currentState = get(themeAtom);
    if (!currentState?.settings) return;

    const newSettings = { ...currentState.settings, ...updates };
    
    // Update both Jotai and Zustand states
    set(themeAtom, {
      ...currentState,
      settings: newSettings
    });
    
    useThemeStore.setState({
      settings: newSettings
    });
  }
);