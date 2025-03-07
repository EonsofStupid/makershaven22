
import { z } from "zod";

// Define security settings schema separately for reuse
export const securitySettingsSchema = z.object({
  enable_ip_filtering: z.boolean().default(false),
  two_factor_auth: z.boolean().default(false),
  max_login_attempts: z.number().default(5),
  ip_whitelist: z.array(z.string()).optional(),
  ip_blacklist: z.array(z.string()).optional(),
  session_timeout_minutes: z.number().optional(),
  lockout_duration_minutes: z.number().optional(),
  rate_limit_requests: z.number().optional(),
  rate_limit_window_minutes: z.number().optional()
});

// Ensure the schema aligns with the Settings interface
// Make required fields have .min(1) to ensure they're required
export const settingsSchema = z.object({
  site_title: z.string().min(1),
  tagline: z.string().optional(),
  primary_color: z.string().min(1),
  secondary_color: z.string().min(1),
  accent_color: z.string().min(1),
  text_primary_color: z.string().min(1),
  text_secondary_color: z.string().min(1),
  text_link_color: z.string().min(1),
  text_heading_color: z.string().min(1),
  neon_cyan: z.string().optional(),
  neon_pink: z.string().optional(),
  neon_purple: z.string().optional(),
  border_radius: z.string().min(1),
  spacing_unit: z.string().min(1),
  transition_duration: z.string().min(1),
  shadow_color: z.string().min(1),
  hover_scale: z.string().min(1),
  font_family_heading: z.string().min(1),
  font_family_body: z.string().min(1),
  font_size_base: z.string().min(1),
  font_weight_normal: z.string().min(1),
  font_weight_bold: z.string().min(1),
  line_height_base: z.string().min(1),
  letter_spacing: z.string().min(1),
  box_shadow: z.string().min(1),
  backdrop_blur: z.string().min(1),
  transition_type: z.enum(["fade", "slide", "scale"]),
  menu_animation_type: z.enum(["fade", "slide", "scale"]).optional(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  theme_mode: z.enum(["light", "dark", "system"]).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().optional(),
  security_settings: securitySettingsSchema.optional()
});

export type SettingsSchema = z.infer<typeof settingsSchema>;
