import { Settings } from '../settings/types';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeState {
  settings: Settings | null;
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
  updateTheme: (settings: Settings) => Promise<void>;
  themeState: ThemeMode;
}