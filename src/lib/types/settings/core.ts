
import { JsonObject } from '../core/json';
import { ThemeMode, GlassEffectLevel, TransitionType } from '../core/enums';
import { SecuritySettings } from '../security/types';

/**
 * Core site settings interface - the foundation of our settings system
 */
export interface SiteSettings {
  // Basic site information
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  
  // Theme mode
  theme_mode?: ThemeMode;
  
  // Color palette
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
  
  // Additional metadata
  metadata?: Record<string, unknown>;
}

/**
 * Theme-specific settings interface
 */
export interface ThemeSettings {
  // Typography
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  
  // Spacing and measurements
  border_radius: string;
  spacing_unit: string;
  
  // Transitions and effects
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  transition_type: TransitionType;
  menu_animation_type?: TransitionType;
}

/**
 * User preferences interface
 */
export interface UserSettings {
  visual_editor_enabled?: boolean;
  gamification_enabled?: boolean;
  onboarding_completed?: boolean;
  notifications_enabled?: boolean;
  display_preferences?: Record<string, unknown>;
}

/**
 * Theme preferences settings
 */
export interface ThemePreferences {
  animations_enabled: boolean;
  real_time_updates: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

/**
 * Complete settings model - comprehensive structure of all settings
 */
export interface Settings {
  // Unique identifier
  id?: string;
  
  // Setting domains
  site: SiteSettings;
  theme: ThemeSettings;
  security: SecuritySettings;
  user: UserSettings;
  theme_preferences?: ThemePreferences;
  
  // Metadata
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

/**
 * Base entity model for all settings types
 */
export interface BaseEntity {
  id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

/**
 * Flattened interface for compatibility with current implementation
 * This combines all settings into a single flat structure
 */
export interface FlattenedSettings extends 
  BaseEntity,
  Omit<SiteSettings, 'metadata'>, 
  ThemeSettings {
  security_settings: SecuritySettings;
  metadata?: Record<string, unknown>;
  theme_mode: ThemeMode;
}

/**
 * Default settings values for the application
 */
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
