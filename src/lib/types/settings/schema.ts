
import { z } from "zod";

// Security settings schema
const securitySettingsSchema = z.object({
  enable_ip_filtering: z.boolean().default(false),
  two_factor_auth: z.boolean().default(false),
  max_login_attempts: z.number().int().min(1).max(20).default(5),
  ip_blacklist: z.array(z.string()).optional(),
  ip_whitelist: z.array(z.string()).optional(),
  rate_limit_requests: z.number().int().min(1).default(100),
  session_timeout_minutes: z.number().int().min(1).default(60),
  lockout_duration_minutes: z.number().int().min(1).default(30),
  rate_limit_window_minutes: z.number().int().min(1).default(5)
});

// Flattened settings schema for forms
export const flattenedSettingsSchema = z.object({
  // System fields
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  created_by: z.string().uuid().optional(),
  updated_by: z.string().uuid().optional(),

  // Site info
  site_title: z.string().min(1, { message: "Site title is required" }).default("MakersImpulse"),
  tagline: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  logo_url: z.string().url().optional(),
  favicon_url: z.string().url().optional(),
  primary_domain: z.string().optional(),
  support_email: z.string().email().optional(),
  contact_email: z.string().email().optional(),
  social_links: z.record(z.string(), z.any()).optional(),
  analytics_id: z.string().optional(),
  custom_scripts: z.array(z.string()).optional(),
  maintenance_mode: z.boolean().optional(),
  maintenance_message: z.string().optional(),
  
  // Theme mode
  theme_mode: z.enum(["light", "dark", "system"]).default("system"),
  
  // Colors
  primary_color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Valid hex color required" }).default("#7FFFD4"),
  secondary_color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Valid hex color required" }).default("#FFB6C1"),
  accent_color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Valid hex color required" }).default("#E6E6FA"),
  text_primary_color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Valid hex color required" }).default("#FFFFFF"),
  text_secondary_color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Valid hex color required" }).default("#A1A1AA"),
  text_link_color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Valid hex color required" }).default("#3B82F6"),
  text_heading_color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Valid hex color required" }).default("#FFFFFF"),
  neon_cyan: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Valid hex color required" }).default("#41f0db"),
  neon_pink: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Valid hex color required" }).default("#ff0abe"),
  neon_purple: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Valid hex color required" }).default("#8000ff"),
  
  // Typography
  font_family_heading: z.string().default("Inter"),
  font_family_body: z.string().default("Inter"),
  font_size_base: z.string().default("16px"),
  font_weight_normal: z.string().default("400"),
  font_weight_bold: z.string().default("700"),
  line_height_base: z.string().default("1.5"),
  letter_spacing: z.string().default("normal"),
  
  // Layout
  border_radius: z.string().default("0.5rem"),
  spacing_unit: z.string().default("1rem"),
  transition_duration: z.string().default("0.3s"),
  shadow_color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Valid hex color required" }).default("#000000"),
  hover_scale: z.string().default("1.05"),
  box_shadow: z.string().optional(),
  backdrop_blur: z.string().optional(),
  
  // Effects
  transition_type: z.enum(["fade", "slide", "scale", "blur"]).default("fade"),
  menu_animation_type: z.enum(["fade", "slide", "scale", "blur"]).default("fade"),
  glass_effect: z.enum(["none", "light", "medium", "heavy"]).default("medium"),
  custom_css: z.string().optional(),
  
  // Security settings
  security_settings: securitySettingsSchema.default({
    enable_ip_filtering: false,
    two_factor_auth: false,
    max_login_attempts: 5
  }),
  
  // Metadata
  metadata: z.record(z.string(), z.any()).optional(),
  theme_preferences: z.record(z.string(), z.any()).optional(),
  theme_metadata: z.record(z.string(), z.any()).optional(),
});

// Export the Zod schema
export const settingsSchema = flattenedSettingsSchema;
