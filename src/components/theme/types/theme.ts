
import { Settings } from "@/components/admin/settings/types";
import { ThemeMode } from "@/lib/types/core/enums";
import { SecuritySettings } from "@/lib/types/security/types";

export interface DatabaseSettingsRow {
  id: string;
  site_title?: string;
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
  security_settings?: any; // Accept any type from database
  theme_mode?: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
}

export interface Theme {
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
  box_shadow: string;
  backdrop_blur: string;
  transition_type: string;
  security_settings: SecuritySettings;
  theme_mode: ThemeMode;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
}

export interface FlattenedSettings {
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
  box_shadow: string;
  backdrop_blur: string;
  transition_type: string;
  security_settings: SecuritySettings;
  theme_mode: ThemeMode;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
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
    box_shadow: settings.box_shadow,
    backdrop_blur: settings.backdrop_blur,
    transition_type: settings.transition_type,
    security_settings: settings.security_settings,
    theme_mode: settings.theme_mode,
    tagline: settings.tagline,
    logo_url: settings.logo_url,
    favicon_url: settings.favicon_url
  };
}

export function themeToFlattenedSettings(theme: Theme, existingSettings?: FlattenedSettings): FlattenedSettings {
  return {
    ...existingSettings,
    site_title: theme.site_title,
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
    security_settings: theme.security_settings,
    theme_mode: theme.theme_mode,
    tagline: theme.tagline,
    logo_url: theme.logo_url,
    favicon_url: theme.favicon_url
  };
}
