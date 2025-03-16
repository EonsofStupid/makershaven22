import { FlattenedSettings } from "../../types/settings/core";
import { SecuritySettings, parseSecuritySettings } from "../../types/security/types";
import { 
  safeThemeMode, 
  safeHexColor, 
  safeCssMeasurement, 
  safeString, 
  safeTransitionType,
  ensureJsonObject
} from "../type-utils";
import { ThemeMode } from "../../types/core/enums";
import { DEFAULT_SETTINGS } from "../../types/settings/core";
import { JsonObject } from "../../types/core/json";

/**
 * Processes raw database response into a properly typed FlattenedSettings object
 * This is the key function for safely handling database responses
 */
export function processDatabaseSettings(data: any): FlattenedSettings {
  if (!data) {
    throw new Error("No data provided to process settings");
  }
  
  // Process security settings from JSON to SecuritySettings type
  const securitySettings = parseSecuritySettings(data.security_settings);
  
  // Process metadata using ensureJsonObject to ensure we get JsonObject type
  const metadata = ensureJsonObject(data.metadata);
  const themePreferences = ensureJsonObject(data.theme_preferences);
  const themeMetadata = ensureJsonObject(data.theme_metadata);
  
  // Ensure theme_mode is a valid ThemeMode
  const themeMode = safeThemeMode(data.theme_mode);
  
  // Ensure transition_type is valid TransitionType
  const transitionType = safeTransitionType(data.transition_type);
  const menuAnimationType = data.menu_animation_type ? safeTransitionType(data.menu_animation_type) : undefined;
  
  // Create a properly typed FlattenedSettings object
  const settingsResult: FlattenedSettings = {
    // System fields
    id: data.id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    created_by: data.created_by,
    updated_by: data.updated_by,

    // Site info
    site_title: safeString(data.site_title, DEFAULT_SETTINGS.site_title),
    tagline: typeof data.tagline === 'string' ? data.tagline : undefined,
    description: typeof data.description === 'string' ? data.description : undefined,
    keywords: Array.isArray(data.keywords) ? data.keywords : undefined,
    logo_url: typeof data.logo_url === 'string' ? data.logo_url : undefined,
    favicon_url: typeof data.favicon_url === 'string' ? data.favicon_url : undefined,
    primary_domain: typeof data.primary_domain === 'string' ? data.primary_domain : undefined,
    support_email: typeof data.support_email === 'string' ? data.support_email : undefined,
    contact_email: typeof data.contact_email === 'string' ? data.contact_email : undefined,
    social_links: ensureJsonObject(data.social_links),
    analytics_id: typeof data.analytics_id === 'string' ? data.analytics_id : undefined,
    custom_scripts: Array.isArray(data.custom_scripts) ? data.custom_scripts : undefined,
    maintenance_mode: typeof data.maintenance_mode === 'boolean' ? data.maintenance_mode : undefined,
    maintenance_message: typeof data.maintenance_message === 'string' ? data.maintenance_message : undefined,
    
    // Theme mode
    theme_mode: themeMode,
    
    // Colors
    primary_color: safeHexColor(data.primary_color, DEFAULT_SETTINGS.primary_color),
    secondary_color: safeHexColor(data.secondary_color, DEFAULT_SETTINGS.secondary_color),
    accent_color: safeHexColor(data.accent_color, DEFAULT_SETTINGS.accent_color),
    text_primary_color: safeHexColor(data.text_primary_color, DEFAULT_SETTINGS.text_primary_color),
    text_secondary_color: safeHexColor(data.text_secondary_color, DEFAULT_SETTINGS.text_secondary_color),
    text_link_color: safeHexColor(data.text_link_color, DEFAULT_SETTINGS.text_link_color),
    text_heading_color: safeHexColor(data.text_heading_color, DEFAULT_SETTINGS.text_heading_color),
    neon_cyan: safeHexColor(data.neon_cyan, DEFAULT_SETTINGS.neon_cyan),
    neon_pink: safeHexColor(data.neon_pink, DEFAULT_SETTINGS.neon_pink),
    neon_purple: safeHexColor(data.neon_purple, DEFAULT_SETTINGS.neon_purple),
    
    // Typography
    font_family_heading: safeString(data.font_family_heading, DEFAULT_SETTINGS.font_family_heading),
    font_family_body: safeString(data.font_family_body, DEFAULT_SETTINGS.font_family_body),
    font_size_base: safeCssMeasurement(data.font_size_base, DEFAULT_SETTINGS.font_size_base),
    font_weight_normal: safeString(data.font_weight_normal, DEFAULT_SETTINGS.font_weight_normal),
    font_weight_bold: safeString(data.font_weight_bold, DEFAULT_SETTINGS.font_weight_bold),
    line_height_base: safeString(data.line_height_base, DEFAULT_SETTINGS.line_height_base),
    letter_spacing: safeString(data.letter_spacing, DEFAULT_SETTINGS.letter_spacing),
    
    // Layout
    border_radius: safeCssMeasurement(data.border_radius, DEFAULT_SETTINGS.border_radius),
    spacing_unit: safeCssMeasurement(data.spacing_unit, DEFAULT_SETTINGS.spacing_unit),
    transition_duration: safeString(data.transition_duration, DEFAULT_SETTINGS.transition_duration),
    shadow_color: safeHexColor(data.shadow_color, DEFAULT_SETTINGS.shadow_color),
    hover_scale: safeString(data.hover_scale, DEFAULT_SETTINGS.hover_scale),
    box_shadow: typeof data.box_shadow === 'string' ? data.box_shadow : DEFAULT_SETTINGS.box_shadow,
    backdrop_blur: typeof data.backdrop_blur === 'string' ? data.backdrop_blur : DEFAULT_SETTINGS.backdrop_blur,
    
    // Effects
    transition_type: transitionType,
    menu_animation_type: menuAnimationType,
    glass_effect: data.glass_effect,
    custom_css: typeof data.custom_css === 'string' ? data.custom_css : undefined,
    
    // Security settings
    security_settings: securitySettings,
    
    // Metadata
    metadata,
    theme_preferences: themePreferences,
    theme_metadata: themeMetadata,
  };

  return settingsResult;
}
