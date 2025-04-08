
import { Json, JsonObject } from "../core/json";
import { GlassEffectLevel, ThemeMode, TransitionType } from "../core/enums";
import { SecuritySettings, DEFAULT_SECURITY_SETTINGS } from "../security/types";

/**
 * Flattened representation of all site and theme settings
 * This is the core interface for all settings in the application
 */
export interface FlattenedSettings {
  // System fields
  id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;

  // Site info
  site_title: string;
  tagline?: string;
  description?: string;
  keywords?: string[];
  logo_url?: string;
  favicon_url?: string;
  primary_domain?: string;
  support_email?: string;
  contact_email?: string;
  social_links?: JsonObject;
  analytics_id?: string;
  custom_scripts?: string[];
  maintenance_mode?: boolean;
  maintenance_message?: string;
  
  // Theme mode
  theme_mode: ThemeMode;
  
  // Colors
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
  
  // Typography
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  
  // Layout
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  
  // Effects
  transition_type: TransitionType;
  menu_animation_type?: TransitionType;
  glass_effect?: GlassEffectLevel;
  custom_css?: string;
  
  // Security
  security_settings: SecuritySettings;
  
  // Custom data
  metadata?: JsonObject;
  theme_preferences?: JsonObject;
  theme_metadata?: JsonObject;
}

/**
 * Default settings to use when initializing or resetting
 */
export const DEFAULT_SETTINGS: FlattenedSettings = {
  // Site info
  site_title: 'MakersImpulse',
  
  // Theme mode
  theme_mode: 'system',
  
  // Colors
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
  
  // Typography
  font_family_heading: 'Inter',
  font_family_body: 'Inter',
  font_size_base: '16px',
  font_weight_normal: '400',
  font_weight_bold: '700',
  line_height_base: '1.5',
  letter_spacing: 'normal',
  
  // Layout
  border_radius: '0.5rem',
  spacing_unit: '1rem',
  transition_duration: '0.3s',
  shadow_color: '#000000',
  hover_scale: '1.05',
  box_shadow: 'none',
  backdrop_blur: '0',
  
  // Effects
  transition_type: 'fade',
  
  // Security
  security_settings: DEFAULT_SECURITY_SETTINGS,
};
