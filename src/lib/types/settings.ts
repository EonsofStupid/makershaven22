export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface Settings {
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
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: ThemeMode;
  transition_type?: TransitionType;
  security_settings?: Record<string, any>;
}

export interface Theme {
  settings: Settings | null;
  mode: ThemeMode;
}

export interface ThemeContextType {
  theme: Theme | null;
  mode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  updateTheme: (settings: Settings) => Promise<void>;
}

export interface SettingsResponse {
  data: Settings;
  error: Error | null;
}