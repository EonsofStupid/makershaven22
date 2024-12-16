import { atom } from 'jotai';
import type { Settings, ThemeMode } from '@/lib/types/theme/base';

export const themeModeAtom = atom<ThemeMode>('system');
export const themeSettingsAtom = atom<Settings | null>(null);
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