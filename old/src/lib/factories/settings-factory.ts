
import { FlattenedSettings, Settings, ThemeSettings, SiteSettings } from "../types/settings/core";
import { SecuritySettings } from "../types/security/types";
import { ThemeMode, TransitionType } from "../types/core/enums";
import { Json } from "../types/core/json";
import { ensureJson, jsonToRecord } from "../utils/type-utils";

/**
 * Factory class for creating, validating, and transforming settings objects.
 * Centralizes the logic for creating type-safe settings objects.
 */
export class SettingsFactory {
  /**
   * Creates a FlattenedSettings object with default values for required fields
   */
  static createDefaultFlattenedSettings(): FlattenedSettings {
    return {
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
      theme_mode: 'system',
      security_settings: {
        enable_ip_filtering: false,
        two_factor_auth: false,
        max_login_attempts: 5
      }
    };
  }
  
  /**
   * Creates a properly typed Settings object from a FlattenedSettings object
   */
  static createStructuredSettings(flatSettings: FlattenedSettings): Settings {
    // Extract properties into domain-specific objects
    const siteSettings: SiteSettings = {
      site_title: flatSettings.site_title,
      tagline: flatSettings.tagline,
      logo_url: flatSettings.logo_url,
      favicon_url: flatSettings.favicon_url,
      theme_mode: flatSettings.theme_mode,
      primary_color: flatSettings.primary_color,
      secondary_color: flatSettings.secondary_color,
      accent_color: flatSettings.accent_color,
      text_primary_color: flatSettings.text_primary_color,
      text_secondary_color: flatSettings.text_secondary_color,
      text_link_color: flatSettings.text_link_color,
      text_heading_color: flatSettings.text_heading_color,
      neon_cyan: flatSettings.neon_cyan,
      neon_pink: flatSettings.neon_pink,
      neon_purple: flatSettings.neon_purple,
    };
    
    const themeSettings: ThemeSettings = {
      font_family_heading: flatSettings.font_family_heading,
      font_family_body: flatSettings.font_family_body,
      font_size_base: flatSettings.font_size_base,
      font_weight_normal: flatSettings.font_weight_normal,
      font_weight_bold: flatSettings.font_weight_bold,
      line_height_base: flatSettings.line_height_base,
      letter_spacing: flatSettings.letter_spacing,
      border_radius: flatSettings.border_radius,
      spacing_unit: flatSettings.spacing_unit,
      transition_duration: flatSettings.transition_duration,
      shadow_color: flatSettings.shadow_color,
      hover_scale: flatSettings.hover_scale,
      box_shadow: flatSettings.box_shadow,
      backdrop_blur: flatSettings.backdrop_blur,
      transition_type: flatSettings.transition_type,
      menu_animation_type: flatSettings.menu_animation_type,
    };
    
    // Create the complete settings object
    return {
      id: flatSettings.id,
      site: siteSettings,
      theme: themeSettings,
      security: flatSettings.security_settings,
      user: {
        visual_editor_enabled: true,
        gamification_enabled: true,
        onboarding_completed: false,
      },
      theme_preferences: flatSettings.theme_preferences,
      created_at: flatSettings.created_at,
      updated_at: flatSettings.updated_at,
      created_by: flatSettings.created_by,
      updated_by: flatSettings.updated_by,
    };
  }
  
  /**
   * Converts a structured Settings object to a flattened format for database operations
   */
  static flattenStructuredSettings(settings: Settings): FlattenedSettings {
    // Extract all required properties from the nested structure
    return {
      id: settings.id,
      // Site settings
      site_title: settings.site.site_title,
      tagline: settings.site.tagline,
      logo_url: settings.site.logo_url,
      favicon_url: settings.site.favicon_url,
      theme_mode: settings.site.theme_mode || 'system',
      primary_color: settings.site.primary_color,
      secondary_color: settings.site.secondary_color,
      accent_color: settings.site.accent_color,
      text_primary_color: settings.site.text_primary_color,
      text_secondary_color: settings.site.text_secondary_color,
      text_link_color: settings.site.text_link_color,
      text_heading_color: settings.site.text_heading_color,
      neon_cyan: settings.site.neon_cyan,
      neon_pink: settings.site.neon_pink,
      neon_purple: settings.site.neon_purple,
      
      // Theme settings
      font_family_heading: settings.theme.font_family_heading,
      font_family_body: settings.theme.font_family_body,
      font_size_base: settings.theme.font_size_base,
      font_weight_normal: settings.theme.font_weight_normal,
      font_weight_bold: settings.theme.font_weight_bold,
      line_height_base: settings.theme.line_height_base,
      letter_spacing: settings.theme.letter_spacing,
      border_radius: settings.theme.border_radius,
      spacing_unit: settings.theme.spacing_unit,
      transition_duration: settings.theme.transition_duration,
      shadow_color: settings.theme.shadow_color,
      hover_scale: settings.theme.hover_scale,
      box_shadow: settings.theme.box_shadow,
      backdrop_blur: settings.theme.backdrop_blur,
      transition_type: settings.theme.transition_type,
      menu_animation_type: settings.theme.menu_animation_type,
      
      // Other settings
      security_settings: settings.security,
      theme_preferences: settings.theme_preferences,
      
      // Metadata - use jsonToRecord to ensure we get a Record<string, unknown>
      metadata: settings.site.metadata ? jsonToRecord(settings.site.metadata) : {},
      
      // Audit fields
      created_at: settings.created_at,
      updated_at: settings.updated_at,
      created_by: settings.created_by,
      updated_by: settings.updated_by,
    };
  }
  
  /**
   * Prepares a FlattenedSettings object for database storage
   * by ensuring all types are compatible with the database schema
   */
  static prepareFlattenedSettingsForDatabase(settings: FlattenedSettings): Record<string, any> {
    return {
      ...settings,
      // Ensure complex types are stored in database-compatible formats
      security_settings: ensureJson(settings.security_settings),
      metadata: settings.metadata ? ensureJson(settings.metadata) : null,
      // Convert enum types to strings if needed
      theme_mode: settings.theme_mode,
      transition_type: settings.transition_type,
    };
  }
}
