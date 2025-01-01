import { z } from 'zod';
import { SecuritySettings } from '../security';

export const settingsSchema = z.object({
  id: z.string().optional(),
  site_title: z.string().min(1, "Site title is required"),
  tagline: z.string().optional(),
  primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  accent_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  text_primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  text_secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  text_link_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  text_heading_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  neon_cyan: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  neon_pink: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  neon_purple: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  font_family_heading: z.string(),
  font_family_body: z.string(),
  font_size_base: z.string(),
  font_weight_normal: z.string(),
  font_weight_bold: z.string(),
  line_height_base: z.string(),
  letter_spacing: z.string(),
  border_radius: z.string().optional(),
  spacing_unit: z.string().optional(),
  transition_duration: z.string().optional(),
  shadow_color: z.string().optional(),
  hover_scale: z.string().optional(),
  box_shadow: z.string().optional(),
  backdrop_blur: z.string().optional(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  transition_type: z.enum(['fade', 'slide', 'scale', 'blur']).optional(),
  menu_animation_type: z.enum(['fade', 'slide-down', 'scale', 'blur']).optional(),
  security_settings: z.custom<SecuritySettings>().optional(),
  theme_mode: z.enum(['light', 'dark', 'system']).optional(),
  state_version: z.number().optional(),
  last_sync: z.string().optional(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;