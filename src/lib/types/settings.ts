export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface Settings {
  site_title: string;
  tagline: string;
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
  transition_type: TransitionType;
  logo_url?: string;
  favicon_url?: string;
}

export interface Theme {
  settings: Settings;
  mode: ThemeMode;
}

// Bridge type for Zustand store
export interface ThemeState {
  settings: Settings | null;
  mode: ThemeMode;
  isLoading: boolean;
  error: Error | null;
  setMode: (mode: ThemeMode) => void;
  updateSettings: (settings: Partial<Settings>) => void;
}

// Bridge type for Jotai atoms
export interface ThemeAtomState {
  settings: Settings | null;
  mode: ThemeMode;
}

export interface DatabaseSettingsRow {
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
  transition_type: TransitionType;
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: ThemeMode;
  updated_at?: string;
  updated_by?: string;
}

export interface SettingsUpdateParams {
  p_site_title: string;
  p_tagline: string;
  p_primary_color: string;
  p_secondary_color: string;
  p_accent_color: string;
  p_text_primary_color: string;
  p_text_secondary_color: string;
  p_text_link_color: string;
  p_text_heading_color: string;
  p_neon_cyan: string;
  p_neon_pink: string;
  p_neon_purple: string;
  p_font_family_heading: string;
  p_font_family_body: string;
  p_font_size_base: string;
  p_font_weight_normal: string;
  p_font_weight_bold: string;
  p_line_height_base: string;
  p_letter_spacing: string;
  p_border_radius: string;
  p_spacing_unit: string;
  p_transition_duration: string;
  p_shadow_color: string;
  p_hover_scale: string;
  p_box_shadow?: string;
  p_backdrop_blur?: string;
  p_transition_type: TransitionType;
  p_logo_url?: string;
  p_favicon_url?: string;
}