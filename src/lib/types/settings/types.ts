import type { Json } from '../core/json';
import type { ThemeMode, TransitionType } from '../core/enums';
import type { SecuritySettings } from '../security/types';
import { z } from 'zod';
import { settingsSchema } from './schema';

// Base settings interface that matches database structure
export interface Settings {
  id: string;
  site_title: string;
  tagline?: string | null;
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
  security_settings?: Json;
  transition_type?: TransitionType;
  menu_animation_type?: 'fade' | 'slide-down' | 'scale' | 'blur';
  theme_mode?: ThemeMode;
  state_version?: number;
  last_sync?: string;
  updated_at?: string;
  updated_by?: string;
}

// Re-export the form data type from schema
export type { SettingsFormData } from './schema';

// Export a type for settings update parameters
export interface SettingsUpdateParams {
  p_site_title: string;
  p_tagline: string;
  p_primary_color: string;
  p_secondary_color: string;
  p_accent_color: string;
  p_text_primary_color: string;
  p_text_secondary_color: string;
  p_text_link_color: string;
  p_text_heading_color: string;
  p_neon_cyan: string;
  p_neon_pink: string;
  p_neon_purple: string;
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
}