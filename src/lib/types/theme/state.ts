import type { Settings, Theme, ThemeMode } from './base';

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