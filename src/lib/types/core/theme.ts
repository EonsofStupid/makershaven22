import type { Settings } from './settings';

export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface Theme {
  settings: Settings | null;
  mode: ThemeMode;
}

export interface ThemeState {
  theme: Theme | null;
  settings: Settings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;
}

export interface ThemeStore extends ThemeState {
  setTheme: (theme: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setError: (error: Error | null) => void;
}