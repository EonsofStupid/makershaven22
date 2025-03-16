
import { Settings } from '../settings/types';
import { ThemeMode } from '../core/enums';
import { SecuritySettings } from '../security/types';

// Core theme state interface
export interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  systemTheme: 'light' | 'dark';
  setSystemTheme: (theme: 'light' | 'dark') => void;
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
  themeState: Record<string, any>;
  setSettings: (settings: Settings) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  updateTheme: (settings: Settings) => Promise<void>;
}

// Type for theme mode
export type ThemeMode = 'light' | 'dark' | 'system';

// Core theme interface (compatible with FlattenedSettings)
export interface ThemeCore {
  // Basic properties
  site_title: string;
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
  
  // Layout and effects
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  transition_type: string;
  
  // Optional properties
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
}

// Helper function to convert FlattenedSettings to ThemeCore
export function convertSettingsToTheme(settings: any): ThemeCore {
  return {
    site_title: settings.site_title || 'MakersImpulse',
    primary_color: settings.primary_color || '#7FFFD4',
    secondary_color: settings.secondary_color || '#FFB6C1',
    accent_color: settings.accent_color || '#E6E6FA',
    text_primary_color: settings.text_primary_color || '#FFFFFF',
    text_secondary_color: settings.text_secondary_color || '#A1A1AA',
    text_link_color: settings.text_link_color || '#3B82F6',
    text_heading_color: settings.text_heading_color || '#FFFFFF',
    neon_cyan: settings.neon_cyan || '#41f0db',
    neon_pink: settings.neon_pink || '#ff0abe',
    neon_purple: settings.neon_purple || '#8000ff',
    font_family_heading: settings.font_family_heading || 'Inter',
    font_family_body: settings.font_family_body || 'Inter',
    font_size_base: settings.font_size_base || '16px',
    font_weight_normal: settings.font_weight_normal || '400',
    font_weight_bold: settings.font_weight_bold || '700',
    line_height_base: settings.line_height_base || '1.5',
    letter_spacing: settings.letter_spacing || 'normal',
    border_radius: settings.border_radius || '0.5rem',
    spacing_unit: settings.spacing_unit || '1rem',
    transition_duration: settings.transition_duration || '0.3s',
    shadow_color: settings.shadow_color || '#000000',
    hover_scale: settings.hover_scale || '1.05',
    box_shadow: settings.box_shadow || 'none',
    backdrop_blur: settings.backdrop_blur || '0',
    transition_type: settings.transition_type || 'fade',
    tagline: settings.tagline,
    logo_url: settings.logo_url,
    favicon_url: settings.favicon_url
  };
}
