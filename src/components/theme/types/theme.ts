
import { Settings } from "@/components/admin/settings/types";
import { ThemeMode } from "@/lib/types/enums";

export interface DatabaseSettingsRow {
  id: string;
  site_title?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_primary_color?: string;
  text_secondary_color?: string;
  text_link_color?: string;
  text_heading_color?: string;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  font_family_heading?: string;
  font_family_body?: string;
  font_size_base?: string;
  font_weight_normal?: string;
  font_weight_bold?: string;
  line_height_base?: string;
  letter_spacing?: string;
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  transition_type?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface Theme {
  site_title: string;
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
  box_shadow: string;
  backdrop_blur: string;
  transition_type: string;
  [key: string]: string;
}

export interface FlattenedSettings {
  site_title: string;
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
  box_shadow: string;
  backdrop_blur: string;
  transition_type: string;
  security_settings?: any;
  theme_mode?: ThemeMode;
}

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  updateTheme: (theme: Theme) => Promise<void>;
  themeMode?: ThemeMode;
  setThemeMode?: (mode: ThemeMode) => void;
  systemTheme?: ThemeMode;
  setSystemTheme?: (mode: ThemeMode) => void;
  effectiveTheme?: ThemeMode;
  cssVariables?: Record<string, string>;
  themeState?: any;
  updateSettings?: (settings: FlattenedSettings) => Promise<void>;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  updateTheme: (theme: Theme) => Promise<void>;
}
