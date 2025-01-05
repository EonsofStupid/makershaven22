import { Settings } from '../settings/types';

export interface ThemeState {
  settings: Settings | null;
  mode: 'light' | 'dark' | 'system';
  themeMode: 'light' | 'dark' | 'system';
  systemTheme: 'light' | 'dark';
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
  isLoading: boolean;
  error: Error | null;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
  updateTheme: (settings: Settings) => void;
}