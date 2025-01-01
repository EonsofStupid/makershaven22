import { Json } from '../core/json';

export interface CmsContent {
  id: string;
  title: string;
  content?: Json;
  metadata?: Json;
  status: 'draft' | 'published' | 'archived';
  created_at?: string;
  updated_at?: string;
  created_by: string;
  updated_by?: string;
}

export interface SiteSettings {
  id: string;
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
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: 'light' | 'dark' | 'system';
  updated_at?: string;
  updated_by?: string;
}

export interface SecuritySettings {
  ip_whitelist: string[];
  ip_blacklist: string[];
  max_login_attempts: number;
  lockout_duration_minutes: number;
  session_timeout_minutes: number;
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  allowed_countries: string[];
  password_requirements: {
    min_length: number;
    require_special: boolean;
    require_numbers: boolean;
    require_uppercase: boolean;
  };
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ContentType = 'page' | 'component' | 'template' | 'workflow';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type PostCategory = 
  | 'Guides'
  | 'Reviews' 
  | 'Blog'
  | 'Site Updates'
  | 'Critical'
  | '3D Printer'
  | '3D Printer Hardware';