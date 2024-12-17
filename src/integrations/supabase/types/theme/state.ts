import { ThemeSettings } from './settings';

export interface ThemeState {
  settings: ThemeSettings | null;
  isLoading: boolean;
  error: Error | null;
  mode: 'light' | 'dark' | 'system';
  themeMode: 'light' | 'dark' | 'system';
  systemTheme: 'light' | 'dark';
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
  setSettings: (settings: ThemeSettings) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  updateSettings: (settings: ThemeSettings) => Promise<void>;
  updateTheme: (settings: ThemeSettings) => Promise<void>;
}