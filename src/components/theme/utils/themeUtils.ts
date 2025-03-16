
import { Theme, DatabaseSettingsRow } from "../types/theme";
import { DEFAULT_SECURITY_SETTINGS } from "@/lib/types/security/types";
import { ThemeMode } from "@/lib/types/core/enums";

export const DEFAULT_THEME_SETTINGS: Theme = {
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
  font_family_heading: 'Inter',
  font_family_body: 'Inter',
  font_size_base: '16px',
  font_weight_normal: '400',
  font_weight_bold: '700',
  line_height_base: '1.5',
  letter_spacing: 'normal',
  border_radius: '0.5rem',
  spacing_unit: '1rem',
  transition_duration: '0.3s',
  shadow_color: '#000000',
  hover_scale: '1.05',
  box_shadow: 'none',
  backdrop_blur: '0',
  transition_type: 'fade',
  security_settings: DEFAULT_SECURITY_SETTINGS,
  theme_mode: 'system' as ThemeMode,
};

export const convertDbSettingsToTheme = (settings: DatabaseSettingsRow | null): Theme => {
  if (!settings) {
    console.log("Using default theme settings");
    return DEFAULT_THEME_SETTINGS;
  }

  // Process security_settings from database
  const securitySettings = settings.security_settings 
    ? (typeof settings.security_settings === 'string' 
        ? JSON.parse(settings.security_settings) 
        : settings.security_settings)
    : DEFAULT_SECURITY_SETTINGS;

  // Process theme_mode from database
  const themeMode = (settings.theme_mode as ThemeMode) || 'system';

  return {
    site_title: settings.site_title || DEFAULT_THEME_SETTINGS.site_title,
    primary_color: settings.primary_color || DEFAULT_THEME_SETTINGS.primary_color,
    secondary_color: settings.secondary_color || DEFAULT_THEME_SETTINGS.secondary_color,
    accent_color: settings.accent_color || DEFAULT_THEME_SETTINGS.accent_color,
    text_primary_color: settings.text_primary_color || DEFAULT_THEME_SETTINGS.text_primary_color,
    text_secondary_color: settings.text_secondary_color || DEFAULT_THEME_SETTINGS.text_secondary_color,
    text_link_color: settings.text_link_color || DEFAULT_THEME_SETTINGS.text_link_color,
    text_heading_color: settings.text_heading_color || DEFAULT_THEME_SETTINGS.text_heading_color,
    neon_cyan: settings.neon_cyan || DEFAULT_THEME_SETTINGS.neon_cyan,
    neon_pink: settings.neon_pink || DEFAULT_THEME_SETTINGS.neon_pink,
    neon_purple: settings.neon_purple || DEFAULT_THEME_SETTINGS.neon_purple,
    font_family_heading: settings.font_family_heading || DEFAULT_THEME_SETTINGS.font_family_heading,
    font_family_body: settings.font_family_body || DEFAULT_THEME_SETTINGS.font_family_body,
    font_size_base: settings.font_size_base || DEFAULT_THEME_SETTINGS.font_size_base,
    font_weight_normal: settings.font_weight_normal || DEFAULT_THEME_SETTINGS.font_weight_normal,
    font_weight_bold: settings.font_weight_bold || DEFAULT_THEME_SETTINGS.font_weight_bold,
    line_height_base: settings.line_height_base || DEFAULT_THEME_SETTINGS.line_height_base,
    letter_spacing: settings.letter_spacing || DEFAULT_THEME_SETTINGS.letter_spacing,
    border_radius: settings.border_radius || DEFAULT_THEME_SETTINGS.border_radius,
    spacing_unit: settings.spacing_unit || DEFAULT_THEME_SETTINGS.spacing_unit,
    transition_duration: settings.transition_duration || DEFAULT_THEME_SETTINGS.transition_duration,
    shadow_color: settings.shadow_color || DEFAULT_THEME_SETTINGS.shadow_color,
    hover_scale: settings.hover_scale || DEFAULT_THEME_SETTINGS.hover_scale,
    box_shadow: settings.box_shadow || DEFAULT_THEME_SETTINGS.box_shadow,
    backdrop_blur: settings.backdrop_blur || DEFAULT_THEME_SETTINGS.backdrop_blur,
    transition_type: settings.transition_type || DEFAULT_THEME_SETTINGS.transition_type,
    security_settings: securitySettings,
    theme_mode: themeMode,
    tagline: settings.tagline,
    logo_url: settings.logo_url,
    favicon_url: settings.favicon_url,
  };
};

export const applyThemeToDocument = (theme: Theme) => {
  console.log("Applying theme to document:", theme.site_title);
  
  const root = document.documentElement;
  // Only apply string values as CSS variables
  Object.entries(theme).forEach(([key, value]) => {
    if (value && typeof value === 'string' && key !== 'theme_mode' && !key.includes('settings')) {
      root.style.setProperty(`--${kebabCase(key)}`, value);
    }
  });

  // Helper to convert camelCase to kebab-case for CSS variables
  function kebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
};
