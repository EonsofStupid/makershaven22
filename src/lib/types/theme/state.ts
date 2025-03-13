
import { Theme, ThemePreferences } from './core';
import { ThemeMode } from '../core/enums';

export interface ThemeState {
  theme: Theme | null;
  mode: ThemeMode;
  preferences: ThemePreferences;
  isLoading: boolean;
  error: string | null;
}

export type ThemeAction = 
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_MODE'; payload: ThemeMode }
  | { type: 'SET_PREFERENCES'; payload: ThemePreferences }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };
