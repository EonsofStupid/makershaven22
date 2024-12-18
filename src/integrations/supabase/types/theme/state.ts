import { ThemeSettings } from './settings';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeState {
  settings: ThemeSettings | null;
  isLoading: boolean;
  error: Error | null;
  mode: ThemeMode;
  themeMode: ThemeMode;
  systemTheme: 'light' | 'dark';
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
  setThemeMode: (mode: ThemeMode) => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
  setSettings: (settings: ThemeSettings) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setMode: (mode: ThemeMode) => void;
  updateSettings: (settings: ThemeSettings) => Promise<void>;
  updateTheme: (settings: ThemeSettings) => Promise<void>;
}