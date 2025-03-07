
import { Settings } from '@/lib/types/settings/core';
import { ThemeMode } from '@/lib/types/core/enums';

export type Theme = Settings;

export interface DatabaseSettingsRow {
  id: string;
  site_title: string;
  tagline?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  box_shadow?: string;
  backdrop_blur?: string;
  transition_type?: string;
  menu_animation_type?: string;
  theme_mode?: ThemeMode;
  logo_url?: string;
  favicon_url?: string;
  security_settings?: any;
  created_at?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface ThemeConfig {
  mode: ThemeMode;
  settings: Settings;
}

// Export interface for the Theme context to be used by ThemeProvider
export interface ThemeContextType {
  settings: Settings | null;
  themeMode: ThemeMode;
  systemTheme: ThemeMode;
  effectiveTheme: ThemeMode;
  cssVariables: Record<string, string>;
  isLoading: boolean;
  error: Error | null;
  setSettings: (settings: Settings | null) => void;
  setThemeMode: (mode: ThemeMode) => void;
  updateTheme: (settings: Settings) => void;
}
