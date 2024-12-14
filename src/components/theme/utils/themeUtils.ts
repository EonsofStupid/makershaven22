import { Theme } from '@/lib/types/settings';

export const applyThemeToDocument = (theme: Theme | null) => {
  if (!theme) {
    console.warn('Theme is not defined, skipping theme application');
    return;
  }

  console.log("Applying theme to document:", theme);
  
  // Apply colors
  document.documentElement.style.setProperty('--primary-color', theme.primary_color);
  document.documentElement.style.setProperty('--secondary-color', theme.secondary_color);
  document.documentElement.style.setProperty('--accent-color', theme.accent_color);
  document.documentElement.style.setProperty('--text-primary-color', theme.text_primary_color);
  document.documentElement.style.setProperty('--text-secondary-color', theme.text_secondary_color);
  document.documentElement.style.setProperty('--text-link-color', theme.text_link_color);
  document.documentElement.style.setProperty('--text-heading-color', theme.text_heading_color);
  document.documentElement.style.setProperty('--neon-cyan', theme.neon_cyan);
  document.documentElement.style.setProperty('--neon-pink', theme.neon_pink);
  document.documentElement.style.setProperty('--neon-purple', theme.neon_purple);

  // Apply typography
  document.documentElement.style.setProperty('--font-family-heading', theme.font_family_heading);
  document.documentElement.style.setProperty('--font-family-body', theme.font_family_body);
  document.documentElement.style.setProperty('--font-size-base', theme.font_size_base);
  document.documentElement.style.setProperty('--font-weight-normal', theme.font_weight_normal);
  document.documentElement.style.setProperty('--font-weight-bold', theme.font_weight_bold);
  document.documentElement.style.setProperty('--line-height-base', theme.line_height_base);
  document.documentElement.style.setProperty('--letter-spacing', theme.letter_spacing);

  // Apply layout
  if (theme.border_radius) {
    document.documentElement.style.setProperty('--border-radius', theme.border_radius);
  }
  if (theme.spacing_unit) {
    document.documentElement.style.setProperty('--spacing-unit', theme.spacing_unit);
  }
  if (theme.transition_duration) {
    document.documentElement.style.setProperty('--transition-duration', theme.transition_duration);
  }
  if (theme.shadow_color) {
    document.documentElement.style.setProperty('--shadow-color', theme.shadow_color);
  }
  if (theme.hover_scale) {
    document.documentElement.style.setProperty('--hover-scale', theme.hover_scale);
  }
  if (theme.box_shadow) {
    document.documentElement.style.setProperty('--box-shadow', theme.box_shadow);
  }
  if (theme.backdrop_blur) {
    document.documentElement.style.setProperty('--backdrop-blur', theme.backdrop_blur);
  }
};