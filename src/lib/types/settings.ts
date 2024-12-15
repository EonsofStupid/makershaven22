import { BaseEntity, UserOwned } from './base';

export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface Settings extends BaseEntity, UserOwned {
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
  border_radius?: string;
  spacing_unit?: string;
  shadow_color?: string;
  hover_scale?: string;
  transition_duration?: string;
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: ThemeMode;
  transition_type?: TransitionType;
  box_shadow?: string;
  backdrop_blur?: string;
  security_settings?: SecuritySettings;
}

export interface SecuritySettings {
  ip_whitelist: string[];
  ip_blacklist: string[];
  max_login_attempts: number;
  lockout_duration_minutes: number;
  session_timeout_minutes: number;
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
}

export interface Theme {
  settings: Settings;
  mode: ThemeMode;
}

export interface ThemeContextType {
  theme: Theme | null;
  mode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  updateTheme: (settings: Settings) => Promise<void>;
}

export interface SettingsFormData extends Omit<Settings, keyof BaseEntity | keyof UserOwned> {}

export interface DatabaseSettingsRow extends Settings {
  id: string;
}