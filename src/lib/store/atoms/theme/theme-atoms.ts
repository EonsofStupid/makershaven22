import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Settings, ThemeMode } from '@/lib/types/settings';

// Theme mode atom with local storage persistence
export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');

// Theme settings atom with local storage persistence
export const themeSettingsAtom = atomWithStorage<Settings | null>('themeSettings', null);

// System theme detection atom
export const systemThemeAtom = atom<'light' | 'dark'>('dark');

// Computed atom for effective theme based on mode and system preference
export const effectiveThemeAtom = atom((get) => {
  const themeMode = get(themeModeAtom);
  const systemTheme = get(systemThemeAtom);
  return themeMode === 'system' ? systemTheme : themeMode;
});

// Theme update atom
export const updateThemeAtom = atom(
  null,
  (get, set, updates: Partial<Settings>) => {
    const currentSettings = get(themeSettingsAtom);
    if (currentSettings) {
      set(themeSettingsAtom, { ...currentSettings, ...updates });
    }
  }
);