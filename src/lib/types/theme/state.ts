import type { Theme, ThemeSettings, ThemeMode } from './settings';

export interface ThemeState {
  theme: Theme | null;
  settings: ThemeSettings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;
}

export interface ThemeActions {
  setTheme: (theme: Theme) => void;
  setMode: (mode: ThemeMode) => void;
  updateSettings: (settings: Partial<ThemeSettings>) => void;
  setError: (error: Error | null) => void;
}

export type ThemeStore = ThemeState & ThemeActions;