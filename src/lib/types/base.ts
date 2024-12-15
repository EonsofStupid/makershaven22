import type { Json } from '@/integrations/supabase/types';

// Core Enums
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'page' | 'component' | 'template' | 'workflow';

// Settings Types
export interface Settings {
  id: string;
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
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  transition_type?: TransitionType;
  updated_at?: string;
  updated_by?: string;
}

// Core State Interface
export interface GlobalState {
  theme: Settings | null;
  settings: Settings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
}