export * from '../../../../lib/types/settings/schema';
export * from '../../../../lib/types/settings/types';
export * from '../../../../lib/types/security/types';

export interface ThemeBase {
  accent_color?: string;
  backdrop_blur?: string;
  border_radius?: string;
  box_shadow?: string;
  component_type?: "color" | "typography" | "layout" | "animation" | "effect";
  favicon_url?: string;
  font_family_body?: string;
  font_family_heading?: string;
  font_size_base?: string;
  font_weight_bold?: string;
  font_weight_normal?: string;
  hover_scale?: string;
  letter_spacing?: string;
  line_height_base?: string;
  logo_url?: string;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  primary_color?: string;
  secondary_color?: string;
  shadow_color?: string;
  site_title?: string;
  spacing_unit?: string;
  tagline?: string;
  text_heading_color?: string;
  text_link_color?: string;
  text_primary_color?: string;
  text_secondary_color?: string;
  theme_mode?: "light" | "dark" | "system";
  transition_duration?: string;
  transition_type?: "fade" | "slide" | "scale" | "blur";
  updated_by?: string;
  security_settings?: Json;
}

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];