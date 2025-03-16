
import type { JsonObject } from '../core/json';
import type { ThemeMode, GlassEffectLevel, TransitionType } from '../core/enums';
import type { SecuritySettings } from '../security/types';

/**
 * Core settings interface
 */
export interface Settings {
  id?: string;
  site: SiteSettings;
  theme: ThemeSettings;
  security: SecuritySettings;
  user: UserSettings;
  theme_preferences?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

/**
 * Site-wide settings interface
 */
export interface SiteSettings {
  site_title: string;
  tagline?: string;
  description?: string;
  keywords?: string[];
  favicon_url?: string;
  logo_url?: string;
  primary_domain?: string;
  support_email?: string;
  contact_email?: string;
  social_links?: JsonObject;
  analytics_id?: string;
  custom_scripts?: string[];
  maintenance_mode?: boolean;
  maintenance_message?: string;
  theme_mode: ThemeMode;
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
  metadata?: JsonObject;
}

/**
 * Theme settings interface
 */
export interface ThemeSettings {
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
  transition_type: TransitionType;
  menu_animation_type?: TransitionType;
  glass_effect?: GlassEffectLevel;
  custom_css?: string;
  theme_metadata?: JsonObject;
}

/**
 * User preferences settings interface
 */
export interface UserSettings {
  visual_editor_enabled: boolean;
  gamification_enabled: boolean;
  onboarding_completed: boolean;
}

/**
 * Flattened settings interface for database storage and form handling
 */
export interface FlattenedSettings {
  // System fields
  id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;

  // Site settings
  site_title: string;
  tagline?: string;
  description?: string;
  keywords?: string[];
  favicon_url?: string;
  logo_url?: string;
  primary_domain?: string;
  support_email?: string;
  contact_email?: string;
  social_links?: JsonObject;
  analytics_id?: string;
  custom_scripts?: string[];
  maintenance_mode?: boolean;
  maintenance_message?: string;

  // Theme settings - Colors
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

  // Theme settings - Typography
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;

  // Theme settings - Layout
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow?: string;
  backdrop_blur?: string;

  // Theme settings - Effects
  theme_mode: ThemeMode;
  transition_type: TransitionType;
  menu_animation_type?: TransitionType;
  glass_effect?: GlassEffectLevel;
  custom_css?: string;

  // Security settings
  security_settings: SecuritySettings;

  // Metadata
  metadata?: Record<string, unknown>;
  theme_preferences?: Record<string, unknown>;
  theme_metadata?: JsonObject;
}

// Export default settings
export const DEFAULT_SETTINGS: FlattenedSettings = {
  site_title: 'MakersImpulse',
  primary_color: '#7FFFD4',
  secondary_color: '#FFB6C1',
  accent_color: '#E6E6FA',
  text_primary_color: '#FFFFFF',
  text_secondary_color: '#A1A1AA',
  text_link_color: '#3B82F6',
  text_heading_color: '#FFFFFF',
  neon_cyan: '#41f0db',
  neon_pink: '#ff0abe',
  neon_purple: '#8000ff',
  font_family_heading: 'Inter',
  font_family_body: 'Inter',
  font_size_base: '16px',
  font_weight_normal: '400',
  font_weight_bold: '700',
  line_height_base: '1.5',
  letter_spacing: 'normal',
  border_radius: '0.5rem',
  spacing_unit: '1rem',
  transition_duration: '0.3s',
  shadow_color: '#000000',
  hover_scale: '1.05',
  box_shadow: 'none',
  backdrop_blur: '0',
  transition_type: 'fade',
  theme_mode: 'system',
  security_settings: {
    enable_ip_filtering: false,
    two_factor_auth: false,
    max_login_attempts: 5
  }
};
