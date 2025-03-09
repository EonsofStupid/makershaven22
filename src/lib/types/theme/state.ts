
import { Settings } from '@/lib/types/settings/core';
import { ThemeMode } from '@/lib/types/core/enums';

export interface ThemeState {
  settings: Settings | null;
  themeMode: ThemeMode;
  systemTheme: ThemeMode;
  effectiveTheme: ThemeMode;
  cssVariables: Record<string, string>;
  themeState: Record<string, any>;
  isLoading: boolean;
  error: Error | null;
  
  setSettings: (settings: Settings | null) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setSystemTheme: (mode: ThemeMode) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  updateTheme: (settings: Settings) => void;
}
