
import { JsonObject } from '../core/json';
import { GlassEffectLevel, ThemeMode, TransitionType } from '../core/enums';
import { SecuritySettings } from '../security/types';

/**
 * Main settings interface
 */
export interface Settings {
  site: SiteSettings;
  theme: ThemeSettings;
  security: SecuritySettings;
  user?: UserSettings;
}

/**
 * Site settings interface
 */
export interface SiteSettings {
  title: string;
  tagline?: string;
  description?: string;
  keywords?: string[];
  logo?: string;
  favicon?: string;
  domain?: string;
  contact?: {
    email?: string;
    support?: string;
  };
  social?: Record<string, string>;
  analytics?: {
    id?: string;
    enabled?: boolean;
  };
  maintenance?: {
    enabled: boolean;
    message?: string;
  };
}

/**
 * Theme settings interface
 */
export interface ThemeSettings {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: {
      primary: string;
      secondary: string;
      link: string;
      heading: string;
    };
    neon: {
      cyan: string;
      pink: string;
      purple: string;
    };
  };
  typography: {
    fontFamily: {
      heading: string;
      body: string;
    };
    fontSize: string;
    fontWeight: {
      normal: string;
      bold: string;
    };
    lineHeight: string;
    letterSpacing: string;
  };
  layout: {
    borderRadius: string;
    spacing: string;
    transitions: {
      duration: string;
      type: TransitionType;
    };
  };
  effects: {
    shadowColor: string;
    hoverScale: string;
    boxShadow?: string;
    backdropBlur?: string;
    glassEffect?: GlassEffectLevel;
  };
  customCss?: string;
  animations?: {
    menu?: TransitionType;
  };
}

/**
 * User settings interface
 */
export interface UserSettings {
  preferences?: {
    theme?: Partial<ThemeSettings>;
    notifications?: {
      email?: boolean;
      push?: boolean;
      digest?: 'daily' | 'weekly' | 'monthly' | 'none';
    };
    display?: {
      compactMode?: boolean;
      highContrast?: boolean;
      fontSize?: 'small' | 'medium' | 'large';
    };
  };
}

/**
 * Flattened settings interface for form handling and database storage
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
  box_shadow?: string;
  backdrop_blur?: string;
  
  // Effects
  transition_type?: TransitionType;
  menu_animation_type?: TransitionType;
  glass_effect?: GlassEffectLevel;
  custom_css?: string;
  
  // Security settings
  security_settings: SecuritySettings;
  
  // Metadata
  metadata?: JsonObject;
  theme_preferences?: JsonObject;
  theme_metadata?: JsonObject;
}

/**
 * Default settings used as fallback values
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
  border_radius: '0.5rem',
  spacing_unit: '1rem',
  transition_duration: '0.3s',
  shadow_color: '#000000',
  hover_scale: '1.05',
  font_family_heading: 'Inter',
  font_family_body: 'Inter',
  font_size_base: '16px',
  font_weight_normal: '400',
  font_weight_bold: '700',
  line_height_base: '1.5',
  letter_spacing: 'normal',
  box_shadow: 'none',
  backdrop_blur: '0',
  theme_mode: 'system',
  transition_type: 'fade',
  glass_effect: 'medium',
  security_settings: {
    enable_ip_filtering: false,
    two_factor_auth: false,
    max_login_attempts: 5
  }
};
