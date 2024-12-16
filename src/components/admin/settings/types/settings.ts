import { z } from 'zod';
import type { ThemeMode } from '@/lib/types/theme';

export interface SettingsFormData {
  site_title: string;
  tagline?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_primary_color?: string;
  text_secondary_color?: string;
  text_link_color?: string;
  text_heading_color?: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius?: string;
  spacing_unit?: string;
  shadow_color?: string;
  hover_scale?: string;
  transition_duration?: string;
  logo_url?: string;
  favicon_url?: string;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  transition_type?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  theme_mode?: ThemeMode;
  menu_animation_type?: string;
}

export interface SettingsResponse {
  data: SettingsFormData;
  error: Error | null;
}