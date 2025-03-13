
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
export const settingsSchema = z.object({
  site_title: z.string().default('MakersImpulse'),
  tagline: z.string().optional(),
  primary_color: z.string().default('#7FFFD4'),
  secondary_color: z.string().default('#FFB6C1'),
  accent_color: z.string().default('#E6E6FA'),
  text_primary_color: z.string().default('#FFFFFF'),
  text_secondary_color: z.string().default('#A1A1AA'),
  text_link_color: z.string().default('#3B82F6'),
  text_heading_color: z.string().default('#FFFFFF'),
  neon_cyan: z.string().default('#41f0db'),
  neon_pink: z.string().default('#ff0abe'),
  neon_purple: z.string().default('#8000ff'),
  border_radius: z.string().default('0.5rem'),
  spacing_unit: z.string().default('1rem'),
  transition_duration: z.string().default('0.3s'),
  shadow_color: z.string().default('#000000'),
  hover_scale: z.string().default('1.05'),
  font_family_heading: z.string().default('Inter'),
  font_family_body: z.string().default('Inter'),
  font_size_base: z.string().default('16px'),
  font_weight_normal: z.string().default('400'),
  font_weight_bold: z.string().default('700'),
  line_height_base: z.string().default('1.5'),
  letter_spacing: z.string().default('normal'),
  box_shadow: z.string().default('none'),
  backdrop_blur: z.string().default('0'),
  transition_type: z.enum(["fade", "slide", "scale"]).default('fade'),
  menu_animation_type: z.enum(["fade", "slide", "scale"]).optional().default('fade'),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().optional(),
  theme_mode: z.string().optional(),
  security_settings: securitySettingsSchema.default({
    enable_ip_filtering: false,
    two_factor_auth: false,
    max_login_attempts: 5,
    ip_whitelist: [],
    ip_blacklist: []
  })
});

export type SettingsSchema = z.infer<typeof settingsSchema>;
