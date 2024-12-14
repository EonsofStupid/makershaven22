import type { Theme, Settings, DatabaseSettingsRow } from '@/lib/types/settings';

export const applyThemeToDocument = (theme: Theme | null) => {
  if (!theme?.settings) {
    console.warn('Theme settings are not defined, skipping theme application');
    return;
  }

  const settings = theme.settings;
  
  // Apply colors
  document.documentElement.style.setProperty('--primary-color', settings.primary_color);
  document.documentElement.style.setProperty('--secondary-color', settings.secondary_color);
  document.documentElement.style.setProperty('--accent-color', settings.accent_color);
  document.documentElement.style.setProperty('--text-primary-color', settings.text_primary_color);
  document.documentElement.style.setProperty('--text-secondary-color', settings.text_secondary_color);
  document.documentElement.style.setProperty('--text-link-color', settings.text_link_color);
  document.documentElement.style.setProperty('--text-heading-color', settings.text_heading_color);
  document.documentElement.style.setProperty('--neon-cyan', settings.neon_cyan);
  document.documentElement.style.setProperty('--neon-pink', settings.neon_pink);
  document.documentElement.style.setProperty('--neon-purple', settings.neon_purple);

  // Apply typography
  document.documentElement.style.setProperty('--font-family-heading', settings.font_family_heading);
  document.documentElement.style.setProperty('--font-family-body', settings.font_family_body);
  document.documentElement.style.setProperty('--font-size-base', settings.font_size_base);
  document.documentElement.style.setProperty('--font-weight-normal', settings.font_weight_normal);
  document.documentElement.style.setProperty('--font-weight-bold', settings.font_weight_bold);
  document.documentElement.style.setProperty('--line-height-base', settings.line_height_base);
  document.documentElement.style.setProperty('--letter-spacing', settings.letter_spacing);

  // Apply layout
  if (settings.border_radius) {
    document.documentElement.style.setProperty('--border-radius', settings.border_radius);
  }
  if (settings.spacing_unit) {
    document.documentElement.style.setProperty('--spacing-unit', settings.spacing_unit);
  }
  if (settings.transition_duration) {
    document.documentElement.style.setProperty('--transition-duration', settings.transition_duration);
  }
  if (settings.shadow_color) {
    document.documentElement.style.setProperty('--shadow-color', settings.shadow_color);
  }
  if (settings.hover_scale) {
    document.documentElement.style.setProperty('--hover-scale', settings.hover_scale);
  }
  if (settings.box_shadow) {
    document.documentElement.style.setProperty('--box-shadow', settings.box_shadow);
  }
  if (settings.backdrop_blur) {
    document.documentElement.style.setProperty('--backdrop-blur', settings.backdrop_blur);
  }
};

export const convertDbSettingsToTheme = (dbSettings: DatabaseSettingsRow | null): Theme => {
  if (!dbSettings) {
    return {
      settings: {
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
        transition_type: 'fade'
      },
      mode: 'system'
    };
  }

  return {
    settings: {
      site_title: dbSettings.site_title,
      tagline: dbSettings.tagline,
      primary_color: dbSettings.primary_color || '#7FFFD4',
      secondary_color: dbSettings.secondary_color || '#FFB6C1',
      accent_color: dbSettings.accent_color || '#E6E6FA',
      text_primary_color: dbSettings.text_primary_color || '#FFFFFF',
      text_secondary_color: dbSettings.text_secondary_color || '#A1A1AA',
      text_link_color: dbSettings.text_link_color || '#3B82F6',
      text_heading_color: dbSettings.text_heading_color || '#FFFFFF',
      neon_cyan: dbSettings.neon_cyan || '#41f0db',
      neon_pink: dbSettings.neon_pink || '#ff0abe',
      neon_purple: dbSettings.neon_purple || '#8000ff',
      font_family_heading: dbSettings.font_family_heading,
      font_family_body: dbSettings.font_family_body,
      font_size_base: dbSettings.font_size_base,
      font_weight_normal: dbSettings.font_weight_normal,
      font_weight_bold: dbSettings.font_weight_bold,
      line_height_base: dbSettings.line_height_base,
      letter_spacing: dbSettings.letter_spacing,
      border_radius: dbSettings.border_radius,
      spacing_unit: dbSettings.spacing_unit,
      transition_duration: dbSettings.transition_duration,
      shadow_color: dbSettings.shadow_color,
      hover_scale: dbSettings.hover_scale,
      box_shadow: dbSettings.box_shadow,
      backdrop_blur: dbSettings.backdrop_blur,
      transition_type: dbSettings.transition_type,
      logo_url: dbSettings.logo_url,
      favicon_url: dbSettings.favicon_url
    },
    mode: dbSettings.theme_mode || 'system'
  };
};