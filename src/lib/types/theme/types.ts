import { Settings } from '../settings/types';

export interface Theme extends Settings {
  transition_type: 'fade' | 'slide' | 'scale';
}

export interface ThemeState {
  settings: Theme | null;
  isLoading: boolean;
  error: Error | null;
  mode: 'light' | 'dark' | 'system';
  themeMode: 'light' | 'dark' | 'system';
  systemTheme: 'light' | 'dark';
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
  setSettings: (settings: Theme) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  updateTheme: (settings: Theme) => Promise<void>;
}