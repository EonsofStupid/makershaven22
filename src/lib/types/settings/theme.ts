import { Json } from '../core/json';
import { ThemeMode, TransitionType } from '../core/enums';

export interface ThemeSettings {
  id: string;
  site_title: string;
  tagline?: string | null;
  primary_color?: string | null;
  secondary_color?: string | null;
  accent_color?: string | null;
  text_primary_color?: string | null;
  text_secondary_color?: string | null;
  text_link_color?: string | null;
  text_heading_color?: string | null;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius?: string | null;
  spacing_unit?: string | null;
  transition_duration?: string | null;
  shadow_color?: string | null;
  hover_scale?: string | null;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  box_shadow?: string | null;
  backdrop_blur?: string | null;
  logo_url?: string | null;
  favicon_url?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
  security_settings?: Json | null;
  transition_type?: TransitionType;
  theme_mode?: ThemeMode;
  state_version?: number | null;
  last_sync?: string | null;
}

export interface ThemeUpdateParams {
  p_site_title: string;
  p_tagline: string;
  p_primary_color: string;
  p_secondary_color: string;
  p_accent_color: string;
  p_text_primary_color: string;
  p_text_secondary_color: string;
  p_text_link_color: string;
  p_text_heading_color: string;
  p_neon_cyan: string;
  p_neon_pink: string;
  p_neon_purple: string;
  p_border_radius: string;
  p_spacing_unit: string;
  p_transition_duration: string;
  p_shadow_color: string;
  p_hover_scale: string;
  p_font_family_heading: string;
  p_font_family_body: string;
  p_font_size_base: string;
  p_font_weight_normal: string;
  p_font_weight_bold: string;
  p_line_height_base: string;
  p_letter_spacing: string;
}

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