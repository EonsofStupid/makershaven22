import type { Theme, Settings } from '@/lib/types';

export const applyThemeToDocument = (settings: Settings | null) => {
  if (!settings) {
    console.warn('Theme settings are not defined, skipping theme application');
    return;
  }

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