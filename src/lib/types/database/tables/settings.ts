
import { SecuritySettings } from '../../settings/security';

/**
 * Database record type matching exactly what Supabase returns
 */
export interface SettingsRecord {
  id: string;
  site_title: string | null; // Nullable with default in DB
  tagline?: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  text_primary_color: string | null;
  text_secondary_color: string | null;
  text_link_color: string | null;
  text_heading_color: string | null;
  neon_cyan?: string | null;
  neon_pink?: string | null;
  neon_purple?: string | null;
  border_radius: string | null;
  spacing_unit: string | null;
  transition_duration: string | null;
  shadow_color: string | null;
  hover_scale: string | null;
  font_family_heading: string | null;
  font_family_body: string | null;
  font_size_base: string | null;
  font_weight_normal: string | null;
  font_weight_bold: string | null;
  line_height_base: string | null;
  letter_spacing: string | null;
  box_shadow: string | null;
  backdrop_blur: string | null;
  transition_type?: 'fade' | 'slide' | 'scale' | null;
  menu_animation_type?: 'fade' | 'slide' | 'scale' | null;
  logo_url?: string | null;
  favicon_url?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
  security_settings?: SecuritySettings | null;
  theme_mode?: string | null;
}

/**
 * Transform database record to Settings type with defaults
 */
export function transformDatabaseToSettings(record: SettingsRecord): Settings {
  return {
    site_title: record.site_title ?? 'MakersImpulse',
    tagline: record.tagline,
    primary_color: record.primary_color ?? '#7FFFD4',
    secondary_color: record.secondary_color ?? '#FFB6C1',
    accent_color: record.accent_color ?? '#E6E6FA',
    text_primary_color: record.text_primary_color ?? '#FFFFFF',
    text_secondary_color: record.text_secondary_color ?? '#A1A1AA',
    text_link_color: record.text_link_color ?? '#3B82F6',
    text_heading_color: record.text_heading_color ?? '#FFFFFF',
    neon_cyan: record.neon_cyan ?? '#41f0db',
    neon_pink: record.neon_pink ?? '#ff0abe',
    neon_purple: record.neon_purple ?? '#8000ff',
    border_radius: record.border_radius ?? '0.5rem',
    spacing_unit: record.spacing_unit ?? '1rem',
    transition_duration: record.transition_duration ?? '0.3s',
    shadow_color: record.shadow_color ?? '#000000',
    hover_scale: record.hover_scale ?? '1.05',
    font_family_heading: record.font_family_heading ?? 'Inter',
    font_family_body: record.font_family_body ?? 'Inter',
    font_size_base: record.font_size_base ?? '16px',
    font_weight_normal: record.font_weight_normal ?? '400',
    font_weight_bold: record.font_weight_bold ?? '700',
    line_height_base: record.line_height_base ?? '1.5',
    letter_spacing: record.letter_spacing ?? 'normal',
    box_shadow: record.box_shadow ?? 'none',
    backdrop_blur: record.backdrop_blur ?? '0',
    transition_type: record.transition_type ?? 'fade',
    menu_animation_type: record.menu_animation_type ?? 'fade',
    logo_url: record.logo_url,
    favicon_url: record.favicon_url,
    updated_at: record.updated_at,
    updated_by: record.updated_by,
    security_settings: record.security_settings ?? {
      enable_ip_filtering: false,
      two_factor_auth: false,
      max_login_attempts: 5,
      ip_whitelist: [],
      ip_blacklist: []
    },
    theme_mode: record.theme_mode
  };
}
