import { atom } from 'jotai';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeState {
  mode: ThemeMode;
  systemTheme: 'light' | 'dark';
}

export const themeAtom = atom<ThemeState>({
  mode: 'system',
  systemTheme: 'dark',
});

export const setThemeAtom = atom(
  (get) => get(themeAtom),
  (_get, set, update: ThemeState) => {
    set(themeAtom, update);
  }
);