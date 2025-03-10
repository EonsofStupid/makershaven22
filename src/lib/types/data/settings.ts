
import { Settings as UISettings } from '../settings/core';
import { SecuritySettings } from '../settings/security';

// Database record type (matches Supabase schema)
export interface SettingsRecord {
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
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  box_shadow: string;
  backdrop_blur: string;
  transition_type?: 'fade' | 'slide' | 'scale';
  menu_animation_type?: 'fade' | 'slide' | 'scale';
  updated_at?: string;
  updated_by?: string;
  security_settings?: SecuritySettings;
}

// Type that represents the settings in our UI layer
export type Settings = UISettings;

// Form data type (used by react-hook-form)
export type SettingsFormData = Settings;
