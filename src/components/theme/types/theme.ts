import type { Settings } from '@/components/admin/settings/types/settings';

export interface Theme {
  settings: Settings | null;
  mode: 'light' | 'dark' | 'system';
}

export interface ThemeContextType {
  theme: Theme | null;
  mode: 'light' | 'dark' | 'system';
  effectiveTheme: 'light' | 'dark';
  updateTheme: (theme: Settings) => void;
}

export interface DatabaseSettingsRow {
  id: string;
  site_title: string;
  tagline?: string;
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
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  updated_at?: string;
  updated_by?: string;
}