
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

export const settingsSchema = z.object({
  site_title: z.string().min(1),
  tagline: z.string().optional(),
  primary_color: z.string(),
  secondary_color: z.string(),
  accent_color: z.string(),
  text_primary_color: z.string(),
  text_secondary_color: z.string(),
  text_link_color: z.string(),
  text_heading_color: z.string(),
  neon_cyan: z.string().optional(),
  neon_pink: z.string().optional(),
  neon_purple: z.string().optional(),
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
  box_shadow: z.string().optional(),
  backdrop_blur: z.string().optional(),
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
