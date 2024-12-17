import { ThemeMode, TransitionType } from './enums';

export interface ThemeState {
  mode: ThemeMode;
  transition: TransitionType;
  systemTheme: ThemeMode;
  effectiveTheme: ThemeMode;
  cssVariables: Record<string, string>;
  settings: ThemeSettings;
  isLoading: boolean;
  error: Error | null;
}

export interface ThemeSettings {
  site_title: string;
  tagline?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  neon_cyan: string;
  neon_pink: string;
  neon_purple: string;
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
  box_shadow?: string;
  backdrop_blur?: string;
  theme_mode?: ThemeMode;
  transition_type?: TransitionType;
}