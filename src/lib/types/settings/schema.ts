
import { z } from "zod";
import { ThemeMode } from '../core/enums';

// Site settings validation schema
export const siteSettingsSchema = z.object({
  site_title: z.string().min(1, "Site title is required"),
  tagline: z.string().optional(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  theme_mode: z.enum(["light", "dark", "system"] as const).optional(),
  primary_color: z.string(),
  secondary_color: z.string(),
  accent_color: z.string(),
  text_primary_color: z.string(),
  text_secondary_color: z.string(),
  text_link_color: z.string(),
  text_heading_color: z.string(),
  neon_cyan: z.string(),
  neon_pink: z.string(),
  neon_purple: z.string(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// Theme settings validation schema
export const themeSettingsSchema = z.object({
  border_radius: z.string(),
  spacing_unit: z.string(),
  transition_duration: z.string(),
  shadow_color: z.string(),
  hover_scale: z.string(),
  font_family_heading: z.string(),
  font_family_body: z.string(),
  font_size_base: z.string(),
  font_weight_normal: z.string(),
  font_weight_bold: z.string(),
  line_height_base: z.string(),
  letter_spacing: z.string(),
  box_shadow: z.string(),
  backdrop_blur: z.string(),
  transition_type: z.enum(["fade", "slide", "scale"] as const),
  menu_animation_type: z.enum(["fade", "slide", "scale"] as const).optional(),
});

// Security settings validation schema
export const securitySettingsSchema = z.object({
  enable_ip_filtering: z.boolean(),
  ip_blacklist: z.array(z.string()).optional(),
  ip_whitelist: z.array(z.string()).optional(),
  two_factor_auth: z.boolean(),
  max_login_attempts: z.number().int().positive(),
  rate_limit_requests: z.number().int().positive().optional(),
  session_timeout_minutes: z.number().int().positive().optional(),
  lockout_duration_minutes: z.number().int().positive().optional(),
  rate_limit_window_minutes: z.number().int().positive().optional(),
});

// User settings validation schema
export const userSettingsSchema = z.object({
  visual_editor_enabled: z.boolean().optional(),
  gamification_enabled: z.boolean().optional(),
  onboarding_completed: z.boolean().optional(),
  notifications_enabled: z.boolean().optional(),
  display_preferences: z.record(z.string(), z.unknown()).optional(),
});

// Complete settings validation schema
export const settingsSchema = z.object({
  id: z.string().uuid().optional(),
  site: siteSettingsSchema,
  theme: themeSettingsSchema,
  security: securitySettingsSchema,
  user: userSettingsSchema,
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  created_by: z.string().uuid().optional(),
  updated_by: z.string().uuid().optional(),
});

// For compatibility with current implementation, a flattened schema
export const flattenedSettingsSchema = z.object({
  site_title: z.string().min(1, "Site title is required"),
  tagline: z.string().optional(),
  primary_color: z.string(),
  secondary_color: z.string(),
  accent_color: z.string(),
  text_primary_color: z.string(),
  text_secondary_color: z.string(),
  text_link_color: z.string(),
  text_heading_color: z.string(),
  neon_cyan: z.string(),
  neon_pink: z.string(),
  neon_purple: z.string(),
  border_radius: z.string(),
  spacing_unit: z.string(),
  transition_duration: z.string(),
  shadow_color: z.string(),
  hover_scale: z.string(),
  font_family_heading: z.string(),
  font_family_body: z.string(),
  font_size_base: z.string(),
  font_weight_normal: z.string(),
  font_weight_bold: z.string(),
  line_height_base: z.string(),
  letter_spacing: z.string(),
  box_shadow: z.string(),
  backdrop_blur: z.string(),
  transition_type: z.enum(["fade", "slide", "scale"] as const),
  menu_animation_type: z.enum(["fade", "slide", "scale"] as const).optional(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  theme_mode: z.enum(["light", "dark", "system"] as const).optional(),
  security_settings: securitySettingsSchema,
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  created_by: z.string().uuid().optional(),
  updated_by: z.string().uuid().optional(),
});

// Type exports
export type SiteSettingsSchema = z.infer<typeof siteSettingsSchema>;
export type ThemeSettingsSchema = z.infer<typeof themeSettingsSchema>;
export type SecuritySettingsSchema = z.infer<typeof securitySettingsSchema>;
export type UserSettingsSchema = z.infer<typeof userSettingsSchema>;
export type SettingsSchema = z.infer<typeof settingsSchema>;
export type FlattenedSettingsSchema = z.infer<typeof flattenedSettingsSchema>;
