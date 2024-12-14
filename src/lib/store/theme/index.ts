import { atom } from 'jotai';
import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';

export const themeAtom = atom<Theme>({
  settings: null,
  mode: 'system'
});

export const themeModeAtom = atom<ThemeMode>('system');

export const updateThemeAtom = atom(
  null,
  (get, set, updates: Partial<Settings>) => {
    const theme = get(themeAtom);
    set(themeAtom, {
      ...theme,
      settings: {
        ...theme.settings,
        ...updates
      }
    });
  }
);