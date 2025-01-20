import { Settings } from '../settings/types';

export interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  systemTheme: 'light' | 'dark';
  setSystemTheme: (theme: 'light' | 'dark') => void;
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
  themeState: Record<string, any>;
  setSettings: (settings: Settings) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  updateTheme: (settings: Settings) => Promise<void>;
}

export type ThemeMode = 'light' | 'dark' | 'system';