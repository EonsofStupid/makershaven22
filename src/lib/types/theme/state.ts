import { Settings } from '../settings/types';

export interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  mode: 'light' | 'dark' | 'system';
  themeMode: 'light' | 'dark' | 'system';
  systemTheme: 'light' | 'dark';
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  updateTheme: (settings: Settings) => Promise<void>;
  themeState: 'light' | 'dark' | 'system';
}