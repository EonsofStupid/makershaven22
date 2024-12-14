import { Theme } from '@/lib/types/settings';

export const applyThemeToDocument = (theme: Theme) => {
  console.log("Applying theme to document:", theme);
  document.documentElement.style.setProperty('--primary-color', theme.settings.primary_color);
  document.documentElement.style.setProperty('--secondary-color', theme.settings.secondary_color);
  document.documentElement.style.setProperty('--accent-color', theme.settings.accent_color);
  document.documentElement.style.setProperty('--text-primary-color', theme.settings.text_primary_color);
  document.documentElement.style.setProperty('--text-secondary-color', theme.settings.text_secondary_color);
  document.documentElement.style.setProperty('--text-link-color', theme.settings.text_link_color);
  document.documentElement.style.setProperty('--text-heading-color', theme.settings.text_heading_color);
  document.documentElement.style.setProperty('--neon-cyan', theme.settings.neon_cyan);
  document.documentElement.style.setProperty('--neon-pink', theme.settings.neon_pink);
  document.documentElement.style.setProperty('--neon-purple', theme.settings.neon_purple);
  document.documentElement.style.setProperty('--font-family-heading', theme.settings.font_family_heading);
  document.documentElement.style.setProperty('--font-family-body', theme.settings.font_family_body);
  document.documentElement.style.setProperty('--font-size-base', theme.settings.font_size_base);
  document.documentElement.style.setProperty('--font-weight-normal', theme.settings.font_weight_normal);
  document.documentElement.style.setProperty('--font-weight-bold', theme.settings.font_weight_bold);
  document.documentElement.style.setProperty('--line-height-base', theme.settings.line_height_base);
  document.documentElement.style.setProperty('--letter-spacing', theme.settings.letter_spacing);
  document.documentElement.style.setProperty('--border-radius', theme.settings.border_radius);
  document.documentElement.style.setProperty('--spacing-unit', theme.settings.spacing_unit);
  document.documentElement.style.setProperty('--transition-duration', theme.settings.transition_duration);
  document.documentElement.style.setProperty('--shadow-color', theme.settings.shadow_color);
  document.documentElement.style.setProperty('--hover-scale', theme.settings.hover_scale);
  document.documentElement.style.setProperty('--box-shadow', theme.settings.box_shadow || 'none');
  document.documentElement.style.setProperty('--backdrop-blur', theme.settings.backdrop_blur || '0');
};