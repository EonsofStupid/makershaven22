import { FlattenedSettings } from "@/lib/types/settings/core";
import { ThemeMode, TransitionType } from "@/lib/types/core/enums";
import { SecuritySettings } from "@/lib/types/security/types";
import { Json, JsonObject } from "@/lib/types/core/json";
import { ensureJson, ensureJsonObject } from "@/lib/utils/type-utils";

export interface DatabaseSettingsRow {
  id: string;
  site_title?: string;
  tagline?: string;
  description?: string;
  keywords?: string[];
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_primary_color?: string;
  text_secondary_color?: string;
  text_link_color?: string;
  text_heading_color?: string;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  font_family_heading?: string;
  font_family_body?: string;
  font_size_base?: string;
  font_weight_normal?: string;
  font_weight_bold?: string;
  line_height_base?: string;
  letter_spacing?: string;
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  transition_type?: string;
  updated_at?: string;
  updated_by?: string;
  setting_key?: string;
  security_settings?: Json;
  theme_mode?: string;
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
  metadata?: Json;
  theme_preferences?: Json;
  theme_metadata?: Json;
}

// Theme interface extends FlattenedSettings but makes all properties required
export interface Theme extends Omit<FlattenedSettings, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by' | 'metadata' | 'theme_preferences' | 'theme_metadata'> {
  // All properties from FlattenedSettings are required except metadata and audit fields
}

export function prepareSettingsForDatabase(settings: FlattenedSettings): Record<string, any> {
  return {
    ...settings,
    security_settings: ensureJson(settings.security_settings),
    metadata: settings.metadata ? ensureJson(settings.metadata) : null,
    theme_preferences: settings.theme_preferences ? ensureJson(settings.theme_preferences) : null,
    theme_metadata: settings.theme_metadata ? ensureJson(settings.theme_metadata) : null,
    theme_mode: settings.theme_mode,
    transition_type: settings.transition_type,
  };
}

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  updateTheme: (theme: Theme) => Promise<void>;
  themeMode?: ThemeMode;
  setThemeMode?: (mode: ThemeMode) => void;
  systemTheme?: ThemeMode;
  setSystemTheme?: (mode: ThemeMode) => void;
  effectiveTheme?: ThemeMode;
  cssVariables?: Record<string, string>;
  themeState?: any;
  updateSettings?: (settings: FlattenedSettings) => Promise<void>;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  updateTheme: (theme: Theme) => Promise<void>;
}

export function flattenedSettingsToTheme(settings: FlattenedSettings): Theme {
  return {
    site_title: settings.site_title,
    tagline: settings.tagline || '',
    description: settings.description || '',
    keywords: settings.keywords || [],
    primary_color: settings.primary_color,
    secondary_color: settings.secondary_color,
    accent_color: settings.accent_color,
    text_primary_color: settings.text_primary_color,
    text_secondary_color: settings.text_secondary_color,
    text_link_color: settings.text_link_color,
    text_heading_color: settings.text_heading_color,
    neon_cyan: settings.neon_cyan,
    neon_pink: settings.neon_pink,
    neon_purple: settings.neon_purple,
    font_family_heading: settings.font_family_heading,
    font_family_body: settings.font_family_body,
    font_size_base: settings.font_size_base,
    font_weight_normal: settings.font_weight_normal,
    font_weight_bold: settings.font_weight_bold,
    line_height_base: settings.line_height_base,
    letter_spacing: settings.letter_spacing,
    border_radius: settings.border_radius,
    spacing_unit: settings.spacing_unit,
    transition_duration: settings.transition_duration,
    shadow_color: settings.shadow_color,
    hover_scale: settings.hover_scale,
    box_shadow: settings.box_shadow || 'none',
    backdrop_blur: settings.backdrop_blur || '0',
    transition_type: settings.transition_type,
    theme_mode: settings.theme_mode,
    security_settings: settings.security_settings,
    logo_url: settings.logo_url || '',
    favicon_url: settings.favicon_url || '',
    maintenance_mode: settings.maintenance_mode || false,
    maintenance_message: settings.maintenance_message || '',
    primary_domain: settings.primary_domain || '',
    support_email: settings.support_email || '',
    contact_email: settings.contact_email || '',
    social_links: settings.social_links || {},
    analytics_id: settings.analytics_id || '',
    custom_scripts: settings.custom_scripts || [],
    glass_effect: settings.glass_effect,
    custom_css: settings.custom_css || '',
    menu_animation_type: settings.menu_animation_type || 'fade'
  };
}

export function themeToFlattenedSettings(theme: Theme, existingSettings?: FlattenedSettings): FlattenedSettings {
  return {
    ...existingSettings,
    site_title: theme.site_title,
    tagline: theme.tagline,
    description: theme.description,
    keywords: theme.keywords,
    primary_color: theme.primary_color,
    secondary_color: theme.secondary_color,
    accent_color: theme.accent_color,
    text_primary_color: theme.text_primary_color,
    text_secondary_color: theme.text_secondary_color,
    text_link_color: theme.text_link_color,
    text_heading_color: theme.text_heading_color,
    neon_cyan: theme.neon_cyan,
    neon_pink: theme.neon_pink,
    neon_purple: theme.neon_purple,
    font_family_heading: theme.font_family_heading,
    font_family_body: theme.font_family_body,
    font_size_base: theme.font_size_base,
    font_weight_normal: theme.font_weight_normal,
    font_weight_bold: theme.font_weight_bold,
    line_height_base: theme.line_height_base,
    letter_spacing: theme.letter_spacing,
    border_radius: theme.border_radius,
    spacing_unit: theme.spacing_unit,
    transition_duration: theme.transition_duration,
    shadow_color: theme.shadow_color,
    hover_scale: theme.hover_scale,
    box_shadow: theme.box_shadow,
    backdrop_blur: theme.backdrop_blur,
    transition_type: theme.transition_type,
    theme_mode: theme.theme_mode,
    security_settings: theme.security_settings,
    logo_url: theme.logo_url,
    favicon_url: theme.favicon_url,
    maintenance_mode: theme.maintenance_mode,
    maintenance_message: theme.maintenance_message,
    primary_domain: theme.primary_domain,
    support_email: theme.support_email,
    contact_email: theme.contact_email,
    social_links: theme.social_links,
    analytics_id: theme.analytics_id,
    custom_scripts: theme.custom_scripts,
    glass_effect: theme.glass_effect,
    custom_css: theme.custom_css,
    menu_animation_type: theme.menu_animation_type
  };
}
