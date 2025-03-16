
import { FlattenedSettings, DEFAULT_SETTINGS } from "@/lib/types/settings/core";
import { DatabaseSettingsRow } from "../types/theme";

export const convertDbSettingsToTheme = (dbSettings: DatabaseSettingsRow | null): FlattenedSettings => {
  if (!dbSettings) {
    return { ...DEFAULT_SETTINGS };
  }

  // Map database settings to flattened settings
  return {
    ...DEFAULT_SETTINGS,
    site_title: dbSettings.site_title || DEFAULT_SETTINGS.site_title,
    tagline: dbSettings.tagline || undefined,
    primary_color: dbSettings.primary_color || DEFAULT_SETTINGS.primary_color,
    secondary_color: dbSettings.secondary_color || DEFAULT_SETTINGS.secondary_color,
    accent_color: dbSettings.accent_color || DEFAULT_SETTINGS.accent_color,
    text_primary_color: dbSettings.text_primary_color || DEFAULT_SETTINGS.text_primary_color,
    text_secondary_color: dbSettings.text_secondary_color || DEFAULT_SETTINGS.text_secondary_color,
    text_link_color: dbSettings.text_link_color || DEFAULT_SETTINGS.text_link_color,
    text_heading_color: dbSettings.text_heading_color || DEFAULT_SETTINGS.text_heading_color,
    neon_cyan: dbSettings.neon_cyan || DEFAULT_SETTINGS.neon_cyan,
    neon_pink: dbSettings.neon_pink || DEFAULT_SETTINGS.neon_pink,
    neon_purple: dbSettings.neon_purple || DEFAULT_SETTINGS.neon_purple,
    border_radius: dbSettings.border_radius || DEFAULT_SETTINGS.border_radius,
    spacing_unit: dbSettings.spacing_unit || DEFAULT_SETTINGS.spacing_unit,
    transition_duration: dbSettings.transition_duration || DEFAULT_SETTINGS.transition_duration,
    shadow_color: dbSettings.shadow_color || DEFAULT_SETTINGS.shadow_color,
    hover_scale: dbSettings.hover_scale || DEFAULT_SETTINGS.hover_scale,
    font_family_heading: dbSettings.font_family_heading || DEFAULT_SETTINGS.font_family_heading,
    font_family_body: dbSettings.font_family_body || DEFAULT_SETTINGS.font_family_body,
    font_size_base: dbSettings.font_size_base || DEFAULT_SETTINGS.font_size_base,
    font_weight_normal: dbSettings.font_weight_normal || DEFAULT_SETTINGS.font_weight_normal,
    font_weight_bold: dbSettings.font_weight_bold || DEFAULT_SETTINGS.font_weight_bold,
    line_height_base: dbSettings.line_height_base || DEFAULT_SETTINGS.line_height_base,
    letter_spacing: dbSettings.letter_spacing || DEFAULT_SETTINGS.letter_spacing,
    logo_url: dbSettings.logo_url || undefined,
    favicon_url: dbSettings.favicon_url || undefined,
    security_settings: dbSettings.security_settings || DEFAULT_SETTINGS.security_settings,
  };
};

export const applyThemeToDocument = (theme: FlattenedSettings): void => {
  if (!theme) {
    console.warn('Attempting to apply null theme, using defaults');
    theme = { ...DEFAULT_SETTINGS };
  }

  // Apply CSS variables to document root
  const root = document.documentElement;

  // Apply colors
  root.style.setProperty('--primary-color', theme.primary_color);
  root.style.setProperty('--secondary-color', theme.secondary_color);
  root.style.setProperty('--accent-color', theme.accent_color);
  root.style.setProperty('--text-primary-color', theme.text_primary_color);
  root.style.setProperty('--text-secondary-color', theme.text_secondary_color);
  root.style.setProperty('--text-link-color', theme.text_link_color);
  root.style.setProperty('--text-heading-color', theme.text_heading_color);
  root.style.setProperty('--neon-cyan', theme.neon_cyan);
  root.style.setProperty('--neon-pink', theme.neon_pink);
  root.style.setProperty('--neon-purple', theme.neon_purple);

  // Apply layout variables
  root.style.setProperty('--border-radius', theme.border_radius);
  root.style.setProperty('--spacing-unit', theme.spacing_unit);
  root.style.setProperty('--transition-duration', theme.transition_duration);
  root.style.setProperty('--shadow-color', theme.shadow_color);
  root.style.setProperty('--hover-scale', theme.hover_scale);

  // Apply typography variables
  root.style.setProperty('--font-family-heading', theme.font_family_heading);
  root.style.setProperty('--font-family-body', theme.font_family_body);
  root.style.setProperty('--font-size-base', theme.font_size_base);
  root.style.setProperty('--font-weight-normal', theme.font_weight_normal);
  root.style.setProperty('--font-weight-bold', theme.font_weight_bold);
  root.style.setProperty('--line-height-base', theme.line_height_base);
  root.style.setProperty('--letter-spacing', theme.letter_spacing);

  // Apply additional properties if they exist
  if (theme.box_shadow) {
    root.style.setProperty('--box-shadow', theme.box_shadow);
  }
  if (theme.backdrop_blur) {
    root.style.setProperty('--backdrop-blur', theme.backdrop_blur);
  }

  console.log('Theme applied to document:', theme.site_title);
};
