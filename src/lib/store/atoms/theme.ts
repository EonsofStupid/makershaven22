import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';

export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');
export const themeSettingsAtom = atomWithStorage<Settings | null>('themeSettings', null);
export const themeAtom = atom<Theme | null>(null);

export const systemThemeAtom = atom<'light' | 'dark'>('dark');

export const effectiveThemeAtom = atom((get) => {
  const themeMode = get(themeModeAtom);
  const systemTheme = get(systemThemeAtom);
  
  return themeMode === 'system' ? systemTheme : themeMode;
});

export const updateThemeAtom = atom(
  null,
  (get, set, updates: Partial<Settings>) => {
    const currentSettings = get(themeSettingsAtom);
    if (currentSettings) {
      set(themeSettingsAtom, { ...currentSettings, ...updates });
    }
  }
);