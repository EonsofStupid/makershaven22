export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface ThemeBase {
  id: string;
  site_title: string;
  tagline?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface ThemeColors {
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_primary_color?: string;
  text_secondary_color?: string;
  text_link_color?: string;
  text_heading_color?: string;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  shadow_color?: string;
}

export interface ThemeEffects {
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  transition_type?: TransitionType;
}

export interface ThemeTypography {
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
}

export interface SecuritySettings {
  ip_whitelist: string[];
  ip_blacklist: string[];
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  max_login_attempts: number;
  lockout_duration_minutes: number;
  session_timeout_minutes: number;
}

export interface Settings extends ThemeBase, ThemeColors, ThemeEffects, ThemeTypography {
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: ThemeMode;
  menu_animation_type?: string;
  security_settings: SecuritySettings;
}

export interface Theme {
  settings: Settings | null;
  mode: ThemeMode;
}