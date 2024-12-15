import { z } from 'zod';

export const settingsSchema = z.object({
  site_title: z.string().min(1, 'Site title is required'),
  tagline: z.string().optional(),
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
  border_radius: z.string().optional(),
  spacing_unit: z.string().optional(),
  shadow_color: z.string().optional(),
  hover_scale: z.string().optional(),
  transition_duration: z.string().optional(),
  neon_cyan: z.string().optional(),
  neon_pink: z.string().optional(),
  neon_purple: z.string().optional(),
  box_shadow: z.string().optional(),
  backdrop_blur: z.string().optional(),
  transition_type: z.enum(['fade', 'slide', 'scale', 'blur']).optional()
});

export type SettingsFormData = z.infer<typeof settingsSchema>;