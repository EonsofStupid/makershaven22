
import { ThemeMode } from '../core/enums';
import { Settings } from '../settings/core';

export interface ThemePreferences {
  darkMode: boolean;
  animations: boolean;
  reduceMotion: boolean;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  linkColor: string;
  headingColor: string;
  neonCyan: string;
  neonPink: string;
  neonPurple: string;
}
