import { z } from 'zod';
import type { ThemeMode, TransitionType } from '../core/enums';
import type { SecuritySettings } from '../security/types';

// Base Settings Interface
export interface Settings extends SecuritySettings {
  id: string;
  site_title: string;
  tagline: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  theme_mode: "light" | "dark" | "system";
  transition_type: "fade" | "slide" | "scale" | "blur";
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  logo_url?: string;
  favicon_url?: string;
}

// Zod Schema for Form Validation
export const settingsSchema = z.object({
  id: z.string().optional(),
  site_title: z.string().min(1, "Site title is required"),
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
  border_radius: z.string(),
  spacing_unit: z.string(),
  transition_duration: z.string(),
  shadow_color: z.string(),
  hover_scale: z.string(),
  box_shadow: z.string(),
  backdrop_blur: z.string(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  security_settings: z.any().optional(), // Using any for Json type compatibility
  transition_type: z.enum(['fade', 'slide', 'scale', 'blur']).optional(),
  menu_animation_type: z.enum(['fade', 'slide-down', 'scale', 'blur']).optional(),
  theme_mode: z.enum(['light', 'dark', 'system']).optional(),
  state_version: z.number().optional(),
  last_sync: z.string().optional(),
});

// Type for form data derived from schema
export type SettingsFormData = z.infer<typeof settingsSchema>;

// Response type for settings API
export interface SettingsResponse {
  data: Settings | null;
  error: Error | null;
}