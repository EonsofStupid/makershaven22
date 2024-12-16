import type { ThemeBase, ThemeColors, ThemeEffects, ThemeTypography, ThemeMode } from './base';

export interface ThemeSettings extends ThemeBase, ThemeColors, ThemeEffects, ThemeTypography {
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: ThemeMode;
  menu_animation_type?: string;
}

export interface Theme {
  settings: ThemeSettings | null;
  mode: ThemeMode;
}

export interface ThemeContextType {
  theme: Theme | null;
  mode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  updateTheme: (settings: ThemeSettings) => Promise<void>;
}