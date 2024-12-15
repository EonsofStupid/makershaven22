import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';

// Persist theme mode preference
export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');

// Main theme settings atom with storage
export const themeSettingsAtom = atomWithStorage<Settings | null>('themeSettings', null);

// Theme update action atom
export const updateThemeAtom = atom(
  null,
  (get, set, updates: Partial<Settings>) => {
    const currentSettings = get(themeSettingsAtom);
    if (currentSettings) {
      set(themeSettingsAtom, { ...currentSettings, ...updates });
    }
  }
);

// System theme detection
export const systemThemeAtom = atom<'light' | 'dark'>('dark');

// Computed effective theme
export const effectiveThemeAtom = atom((get) => {
  const themeMode = get(themeModeAtom);
  const systemTheme = get(systemThemeAtom);
  
  return themeMode === 'system' ? systemTheme : themeMode;
});