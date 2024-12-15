// Basic types from Supabase schema
export type Json = any;

// Auth types
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
}

// Settings types
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface Settings {
  id: string;
  site_title: string;
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
  theme_mode?: ThemeMode;
  transition_type?: TransitionType;
  box_shadow?: string;
  backdrop_blur?: string;
}

// Store types
export interface GlobalState {
  settings: Settings | null;
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
}

// Content types
export interface BaseContent {
  id: string;
  title: string;
  content?: Json;
  created_at?: string;
  updated_at?: string;
}

// Workflow types
export interface WorkflowStage {
  id: string;
  name: string;
  type: string;
  config: Json;
  order: number;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
}