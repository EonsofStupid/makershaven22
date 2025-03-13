
import { Json } from '../core/json';
import { ThemeMode } from '../core/enums';
import { SecuritySettings } from '../security/types';

// Core site settings interface - the foundation of our settings system
export interface SiteSettings {
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: ThemeMode;
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
  metadata?: Record<string, unknown>;
}

// Theme-specific settings
export interface ThemeSettings {
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
  transition_type: "fade" | "slide" | "scale";
  menu_animation_type?: "fade" | "slide" | "scale";
}

// User preferences
export interface UserSettings {
  visual_editor_enabled?: boolean;
  gamification_enabled?: boolean;
  onboarding_completed?: boolean;
  notifications_enabled?: boolean;
  display_preferences?: Record<string, unknown>;
}

// Complete settings model
export interface Settings {
  id?: string;
  site: SiteSettings;
  theme: ThemeSettings;
  security: SecuritySettings;
  user: UserSettings;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

// Flattened interface for compatibility with current implementation
export interface FlattenedSettings extends 
  SiteSettings, 
  ThemeSettings, 
  Omit<Settings, 'site' | 'theme' | 'security' | 'user'> {
  security_settings: SecuritySettings;
}
