
// Core settings types
export interface Settings {
  site_title: string;
  tagline?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  logo_url?: string;
  favicon_url?: string;
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
  box_shadow?: string;
  backdrop_blur?: string;
  transition_type?: 'fade' | 'slide' | 'scale';
  menu_animation_type?: 'fade' | 'slide' | 'scale';
  updated_at?: string;
  updated_by?: string;
  theme_mode?: 'light' | 'dark' | 'system';
  security_settings?: SecuritySettings;
}

// Extension for update operations
export interface SettingsUpdate {
  p_site_title: string;
  p_tagline: string;
  p_primary_color: string;
  p_secondary_color: string;
  p_accent_color: string;
  p_text_primary_color: string;
  p_text_secondary_color: string;
  p_text_link_color: string;
  p_text_heading_color: string;
  p_neon_cyan?: string;
  p_neon_pink?: string;
  p_neon_purple?: string;
  p_border_radius: string;
  p_spacing_unit: string;
  p_transition_duration: string;
  p_shadow_color: string;
  p_hover_scale: string;
  p_font_family_heading: string;
  p_font_family_body: string;
  p_font_size_base: string;
  p_font_weight_normal: string;
  p_font_weight_bold: string;
  p_line_height_base: string;
  p_letter_spacing: string;
  p_box_shadow?: string;
  p_backdrop_blur?: string;
  p_transition_type?: string;
  p_menu_animation_type?: string;
  p_logo_url?: string;
  p_favicon_url?: string;
  p_security_settings?: SecuritySettings;
}

// Site settings specific interface
export interface SiteSettings extends Settings {
  id?: string;
  created_at?: string;
}

// Import SecuritySettings from security.ts to avoid circular dependencies
import { SecuritySettings } from './security';

// Export the SecuritySettings type from here too for convenience
export type { SecuritySettings };
