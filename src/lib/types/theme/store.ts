import type { Settings } from '../settings';
import type { ThemeMode } from './base';

export interface ThemeStore {
  theme: Settings | null;
  mode: ThemeMode;
  isLoading: boolean;
  error: Error | null;
  setTheme: (theme: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setError: (error: Error | null) => void;
}

export interface ThemeState {
  theme: Settings | null;
  mode: ThemeMode;
  isLoading: boolean;
  error: Error | null;
}