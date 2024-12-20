import { z } from "zod";

export const baseSettingsSchema = z.object({
  site_title: z.string(),
  tagline: z.string(),
  primary_color: z.string(),
  secondary_color: z.string(),
  accent_color: z.string(),
  text_primary_color: z.string(),
  text_secondary_color: z.string(),
  text_link_color: z.string(),
  text_heading_color: z.string(),
  font_family_heading: z.string(),
  font_family_body: z.string(),
  font_size_base: z.string(),
  font_weight_normal: z.string(),
  font_weight_bold: z.string(),
  line_height_base: z.string(),
  letter_spacing: z.string(),
  border_radius: z.string(),
  spacing_unit: z.string(),
  transition_duration: z.string(),
  shadow_color: z.string(),
  hover_scale: z.string(),
  box_shadow: z.string(),
  backdrop_blur: z.string(),
  theme_mode: z.enum(["light", "dark", "system"]),
  transition_type: z.enum(["fade", "slide", "scale", "blur"]),
  security: z.object({
    ip_whitelist: z.array(z.string()).default([]),
    ip_blacklist: z.array(z.string()).default([]),
    enable_ip_filtering: z.boolean().default(false),
    max_login_attempts: z.number().default(5),
    lockout_duration: z.number().default(30),
    trusted_proxies: z.array(z.string()).optional(),
    two_factor_auth: z.boolean().default(false),
    password_expiry_days: z.number().default(90),
    session_timeout: z.number().default(60),
    require_strong_passwords: z.boolean().default(true),
    minimum_password_length: z.number().default(12)
  }).default({}),
});

export type BaseSettingsSchema = z.infer<typeof baseSettingsSchema>; 