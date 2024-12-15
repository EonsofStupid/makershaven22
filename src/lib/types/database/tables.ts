import { Json } from '@/integrations/supabase/types';

// Base table interface
export interface BaseTable {
  id: string;
  created_at?: string;
  updated_at?: string;
}

// Profile table type matching Supabase schema
export interface Profile extends BaseTable {
  username?: string;
  display_name?: string;
  avatar_url?: string;
  role?: 'subscriber' | 'maker' | 'admin' | 'super_admin';
  bio?: string;
  website?: string;
  location?: string;
  is_banned?: boolean;
  ban_reason?: string;
  banned_at?: string;
  banned_by?: string;
  two_factor_enabled?: boolean;
  two_factor_secret?: string;
  onboarding_completed?: boolean;
  gamification_enabled?: boolean;
  visual_editor_enabled?: boolean;
  last_login_at?: string;
  pin_enabled?: boolean;
  last_password_login?: string;
  failed_login_attempts?: number;
  lockout_until?: string;
}

// Site settings table type
export interface SiteSettings extends BaseTable {
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
  transition_type?: string;
  box_shadow?: string;
  backdrop_blur?: string;
}

// Content management types
export interface CMSContent extends BaseTable {
  title: string;
  type: 'page' | 'component' | 'template' | 'workflow';
  content?: Json;
  metadata?: Json;
  slug?: string;
  status?: 'draft' | 'published' | 'archived';
  version?: number;
  created_by?: string;
  updated_by?: string;
}

export interface CMSWorkflow extends BaseTable {
  name: string;
  description?: string;
  steps: Json;
  triggers?: Json;
  created_by?: string;
}