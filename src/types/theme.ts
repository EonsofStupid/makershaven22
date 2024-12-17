import { Json } from './json';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

export enum TransitionType {
  FADE = 'fade',
  SLIDE = 'slide',
  SCALE = 'scale',
  BLUR = 'blur'
}

export interface ThemeSettings {
  site_title: string;
  tagline?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  neon_cyan: string;
  neon_pink: string;
  neon_purple: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow?: string;
  backdrop_blur?: string;
  theme_mode?: ThemeMode;
  transition_type?: TransitionType;
  security_settings?: Json;
}

export interface ThemeState {
  settings: ThemeSettings | null;
  isLoading: boolean;
  error: Error | null;
  mode: ThemeMode;
  themeMode: ThemeMode;
  systemTheme: ThemeMode;
  effectiveTheme: ThemeMode;
  cssVariables: Record<string, string>;
  setThemeMode: (mode: ThemeMode) => void;
  setSystemTheme: (theme: ThemeMode) => void;
  setSettings: (settings: ThemeSettings) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error) => void;
  setMode: (mode: ThemeMode) => void;
  updateSettings: (settings: ThemeSettings) => Promise<void>;
  updateTheme: (settings: ThemeSettings) => Promise<void>;
}