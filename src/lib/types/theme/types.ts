import { Settings } from '../settings/types';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme extends Settings {
  transition_type: 'fade' | 'slide' | 'scale';
}

export interface ThemeState {
  settings: Theme | null;
  isLoading: boolean;
  error: Error | null;
  mode: ThemeMode;
  themeMode: ThemeMode;
  systemTheme: 'light' | 'dark';
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
  setThemeMode: (mode: ThemeMode) => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
  setMode: (mode: ThemeMode) => void;
  updateTheme: (settings: Theme) => Promise<void>;
}