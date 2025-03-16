import { z } from "zod";
import { SecuritySettings } from '../security/types';

// Color validation regex
const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Define color schema with validation
const colorSchema = z.string().regex(hexColorRegex, "Must be a valid hex color (e.g. #FF0000)");

// CSS measurement validation (px, rem, em, etc.)
const cssUnitRegex = /^[0-9]+(px|rem|em|%|vh|vw|vmin|vmax|pt|pc|in|cm|mm|ex|ch)$/;
const cssUnitOrNumberRegex = /^[0-9]+(\.[0-9]+)?(px|rem|em|%|vh|vw|vmin|vmax|pt|pc|in|cm|mm|ex|ch)?$/;

// Define CSS measurement schema with validation
const measurementSchema = z.string().regex(cssUnitRegex, "Must include a valid CSS unit (e.g. 16px, 1.5rem)");
const scaleValueSchema = z.string().regex(cssUnitOrNumberRegex, "Must be a number with optional CSS unit");

// Theme mode enum
const themeModeEnum = z.enum(['light', 'dark', 'system']);
const transitionTypeEnum = z.enum(['fade', 'slide', 'scale']);
const glassEffectEnum = z.enum(['none', 'light', 'medium', 'heavy']);

// Zod schema for flattened settings - matches the FlattenedSettings type
export const flattenedSettingsSchema = z.object({
  // System fields
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  created_by: z.string().optional(),
  updated_by: z.string().optional(),

  // Site settings
  site_title: z.string().min(1, "Site title is required"),
  tagline: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  favicon_url: z.string().url("Must be a valid URL").optional().nullable(),
  logo_url: z.string().url("Must be a valid URL").optional().nullable(),
  primary_domain: z.string().optional(),
  support_email: z.string().email("Must be a valid email").optional(),
  contact_email: z.string().email("Must be a valid email").optional(),
  social_links: z.record(z.unknown()).optional(),
  analytics_id: z.string().optional(),
  custom_scripts: z.array(z.string()).optional(),
  maintenance_mode: z.boolean().optional(),
  maintenance_message: z.string().optional(),

  // Theme settings - Colors
  primary_color: colorSchema,
  secondary_color: colorSchema,
  accent_color: colorSchema,
  text_primary_color: colorSchema,
  text_secondary_color: colorSchema,
  text_link_color: colorSchema,
  text_heading_color: colorSchema,
  neon_cyan: colorSchema,
  neon_pink: colorSchema,
  neon_purple: colorSchema,

  // Theme settings - Typography
  font_family_heading: z.string(),
  font_family_body: z.string(),
  font_size_base: measurementSchema,
  font_weight_normal: z.string().regex(/^[1-9][0-9]{2}$/, "Must be a font weight value (e.g. 400)"),
  font_weight_bold: z.string().regex(/^[1-9][0-9]{2}$/, "Must be a font weight value (e.g. 700)"),
  line_height_base: scaleValueSchema,
  letter_spacing: z.string(),

  // Theme settings - Layout
  border_radius: measurementSchema,
  spacing_unit: measurementSchema,
  transition_duration: z.string().regex(/^[0-9]+(\.[0-9]+)?s$/, "Must be in seconds (e.g. 0.3s)"),
  shadow_color: colorSchema,
  hover_scale: scaleValueSchema,
  box_shadow: z.string().optional(),
  backdrop_blur: z.string().optional(),

  // Theme settings - Effects
  theme_mode: themeModeEnum,
  transition_type: transitionTypeEnum,
  menu_animation_type: transitionTypeEnum.optional(),
  glass_effect: glassEffectEnum.optional(),
  custom_css: z.string().optional(),

  // Security settings
  security_settings: z.object({
    enable_ip_filtering: z.boolean(),
    two_factor_auth: z.boolean(),
    max_login_attempts: z.number(),
    ip_blacklist: z.array(z.string()).optional(),
    ip_whitelist: z.array(z.string()).optional(),
    rate_limit_requests: z.number().optional(),
    session_timeout_minutes: z.number().optional(),
    lockout_duration_minutes: z.number().optional(),
    rate_limit_window_minutes: z.number().optional()
  }).strict(),

  // Metadata
  metadata: z.record(z.unknown()).optional(),
  theme_preferences: z.record(z.unknown()).optional(),
  theme_metadata: z.record(z.unknown()).optional(),
});

// Export schema type
export type FlattenedSettingsSchema = z.infer<typeof flattenedSettingsSchema>;

// Enhanced settings validation
export function validateSettings(settings: unknown): { 
  valid: boolean; 
  data?: FlattenedSettingsSchema; 
  errors?: z.ZodError 
} {
  try {
    const validatedData = flattenedSettingsSchema.parse(settings);
    return { valid: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error };
    }
    throw error;
  }
}
