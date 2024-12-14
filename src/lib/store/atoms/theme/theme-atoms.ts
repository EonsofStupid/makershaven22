import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useThemeStore } from '../../theme-store';
import type { Settings, Theme, ThemeMode, ThemeAtomState } from '@/lib/types/settings';

// Sync with Zustand store
export const themeAtom = atom<ThemeAtomState>((get) => ({
  settings: useThemeStore.getState().settings,
  mode: useThemeStore.getState().mode
}));

// Mode management
export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');
export const systemThemeAtom = atom<'light' | 'dark'>('dark');

// Computed effective theme
export const effectiveThemeAtom = atom((get) => {
  const themeMode = get(themeModeAtom);
  const systemTheme = get(systemThemeAtom);
  return themeMode === 'system' ? systemTheme : themeMode;
});

// Theme update action
export const updateThemeAtom = atom(
  null,
  async (get, set, updates: Partial<Settings>) => {
    const currentState = get(themeAtom);
    if (!currentState.settings) return;

    useThemeStore.setState({
      settings: { ...currentState.settings, ...updates }
    });

    set(themeAtom, {
      ...currentState,
      settings: { ...currentState.settings, ...updates }
    });
  }
);