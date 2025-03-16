
import { ThemeMode, TransitionType } from '../core/enums';
import { Json } from '../core/json';

/**
 * Core theme state interface for Zustand store
 */
export interface ThemeState {
  // Core data
  settings: FlattenedSettings | null;
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  setSettings: (settings: FlattenedSettings) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  updateSettings: (settings: FlattenedSettings) => Promise<void>;
  
  // Theme mode controls
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  
  // System preferences
  systemPreference: 'light' | 'dark';
  setSystemPreference: (preference: 'light' | 'dark') => void;
  
  // Computed effective theme (result of themeMode + systemPreference)
  effectiveTheme: 'light' | 'dark';
}

export interface FlattenedSettings {
  site_title: string;
  tagline?: string;
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
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  security_settings: Record<string, unknown>;
  theme_mode: ThemeMode;
  transition_type?: TransitionType;
  box_shadow?: string;
  backdrop_blur?: string;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Type for theme settings updates sent to the server
 */
export interface ThemeSettingsUpdate {
  p_site_title: string;
  p_tagline?: string;
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
  p_font_family_heading: string;
  p_font_family_body: string;
  p_font_size_base: string;
  p_font_weight_normal: string;
  p_font_weight_bold: string;
  p_line_height_base: string;
  p_letter_spacing: string;
  p_border_radius: string;
  p_spacing_unit: string;
  p_transition_duration: string;
  p_shadow_color: string;
  p_hover_scale: string;
  p_security_settings: any;
  p_theme_mode: ThemeMode;
  p_transition_type?: TransitionType;
  p_box_shadow?: string;
  p_backdrop_blur?: string;
}

/**
 * Convert FlattenedSettings to ThemeSettingsUpdate for RPC calls
 */
export function settingsToUpdateParams(settings: FlattenedSettings): ThemeSettingsUpdate {
  return {
    p_site_title: settings.site_title,
    p_tagline: settings.tagline || '',
    p_primary_color: settings.primary_color,
    p_secondary_color: settings.secondary_color,
    p_accent_color: settings.accent_color,
    p_text_primary_color: settings.text_primary_color,
    p_text_secondary_color: settings.text_secondary_color,
    p_text_link_color: settings.text_link_color,
    p_text_heading_color: settings.text_heading_color,
    p_neon_cyan: settings.neon_cyan,
    p_neon_pink: settings.neon_pink,
    p_neon_purple: settings.neon_purple,
    p_font_family_heading: settings.font_family_heading,
    p_font_family_body: settings.font_family_body,
    p_font_size_base: settings.font_size_base,
    p_font_weight_normal: settings.font_weight_normal,
    p_font_weight_bold: settings.font_weight_bold,
    p_line_height_base: settings.line_height_base,
    p_letter_spacing: settings.letter_spacing,
    p_border_radius: settings.border_radius,
    p_spacing_unit: settings.spacing_unit,
    p_transition_duration: settings.transition_duration,
    p_shadow_color: settings.shadow_color,
    p_hover_scale: settings.hover_scale,
    p_security_settings: settings.security_settings,
    p_theme_mode: settings.theme_mode,
    p_transition_type: settings.transition_type,
    p_box_shadow: settings.box_shadow,
    p_backdrop_blur: settings.backdrop_blur
  };
}
