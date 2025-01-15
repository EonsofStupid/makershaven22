import { ThemeMode } from './enums';
import { Json } from './base';

export interface Settings {
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
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  box_shadow?: string;
  backdrop_blur?: string;
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: ThemeMode;
  transition_type: 'fade' | 'slide' | 'scale';
  security_settings: {
    enable_ip_filtering: boolean;
    two_factor_auth: boolean;
    max_login_attempts: number;
  };
  updated_at?: string;
  updated_by?: string;
}

export interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  setSettings: (settings: Settings) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  updateSettings: (settings: Settings) => Promise<void>;
}