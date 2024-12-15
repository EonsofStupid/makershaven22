export type BaseEntity = {
  id: string;
  created_at?: string;
  updated_at?: string;
};

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'template' | 'page' | 'component' | 'workflow';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// Unified auth types
export interface AuthUser {
  id: string;
  email: string;
  role?: UserRole;
  metadata?: Record<string, any>;
}

export interface AuthSession {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  user?: AuthUser;
}

// Core settings types
export interface Settings extends BaseEntity {
  site_title: string;
  tagline?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_primary_color?: string;
  text_secondary_color?: string;
  text_link_color?: string;
  text_heading_color?: string;
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
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  security_settings?: Json;
  transition_type?: TransitionType;
  box_shadow?: string;
  backdrop_blur?: string;
  theme_mode?: ThemeMode;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}

export interface Theme {
  settings: Settings;
  mode: ThemeMode;
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