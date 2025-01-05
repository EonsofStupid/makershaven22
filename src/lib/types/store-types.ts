import { Settings } from './settings/types';
import { ThemeMode } from './theme/types';

export interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  mode: ThemeMode;
  themeMode: ThemeMode;
  systemTheme: 'light' | 'dark';
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
}