
import { z } from "zod";
import { ThemeMode } from "../core/enums";

// Zod schema for flattened settings - matches the FlattenedSettings type
export const flattenedSettingsSchema = z.object({
  // Site settings
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
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  theme_mode: z.enum(["light", "dark", "system"] as const).optional(),
  
  // Theme settings
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
  }),
  
  // Metadata (optional)
  metadata: z.record(z.unknown()).optional(),
  
  // System fields
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  created_by: z.string().optional(),
  updated_by: z.string().optional()
});

// Export schema type
export type FlattenedSettingsSchema = z.infer<typeof flattenedSettingsSchema>;
