
import { FlattenedSettings } from "../../types/settings/core";
import { DEFAULT_SETTINGS } from "../../types/settings/core";

/**
 * Converts a structured Settings object to a flattened format for forms and UI
 */
export function flattenSettings(settings: any): FlattenedSettings | null {
  if (!settings) return null;
  
  const { site, theme, security, user, ...rest } = settings;
  
  if (!site || !theme) {
    console.error('Invalid settings structure: missing site or theme properties');
    return null;
  }
  
  return {
    ...site,
    ...theme,
    security_settings: security || DEFAULT_SETTINGS.security_settings,
    // We don't flatten user settings as they're not used in the form
    ...rest
  };
}

/**
 * Converts a flattened settings object back to a structured format
 */
export function unflattenSettings(flatSettings: FlattenedSettings): any {
  if (!flatSettings) return null;
  
  const {
    // Site settings
    site_title, tagline, logo_url, favicon_url, theme_mode,
    primary_color, secondary_color, accent_color,
    text_primary_color, text_secondary_color, text_link_color, text_heading_color,
    neon_cyan, neon_pink, neon_purple, metadata,
    
    // Theme settings
    border_radius, spacing_unit, transition_duration, shadow_color, hover_scale,
    font_family_heading, font_family_body, font_size_base,
    font_weight_normal, font_weight_bold, line_height_base, letter_spacing,
    box_shadow, backdrop_blur, transition_type, menu_animation_type,
    
    // Security settings
    security_settings,
    
    // Metadata
    id, created_at, updated_at, created_by, updated_by,
    
    // We ignore other properties
    ...rest
  } = flatSettings;
  
  return {
    id,
    site: {
      site_title, 
      tagline, 
      logo_url, 
      favicon_url, 
      theme_mode,
      primary_color, 
      secondary_color, 
      accent_color,
      text_primary_color, 
      text_secondary_color, 
      text_link_color, 
      text_heading_color,
      neon_cyan, 
      neon_pink, 
      neon_purple, 
      metadata,
    },
    theme: {
      border_radius, 
      spacing_unit, 
      transition_duration, 
      shadow_color, 
      hover_scale,
      font_family_heading, 
      font_family_body, 
      font_size_base,
      font_weight_normal, 
      font_weight_bold, 
      line_height_base, 
      letter_spacing,
      box_shadow, 
      backdrop_blur, 
      transition_type, 
      menu_animation_type,
    },
    security: security_settings || {
      enable_ip_filtering: false,
      two_factor_auth: false,
      max_login_attempts: 5,
    },
    user: {
      visual_editor_enabled: true,
      gamification_enabled: true,
      onboarding_completed: false,
    },
    created_at,
    updated_at,
    created_by,
    updated_by,
  };
}

/**
 * Utility function to detect if settings needs migration
 */
export function isFlattenedSettings(data: any): boolean {
  return data && 
    typeof data === 'object' && 
    'site_title' in data && 
    !('site' in data) && 
    !('theme' in data);
}
