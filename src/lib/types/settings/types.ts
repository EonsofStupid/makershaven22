
import { Json } from '../core/json';
import { ThemeMode } from '../core/enums';

export interface Settings {
  id?: string;
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
  box_shadow: string;
  backdrop_blur: string;
  transition_type: "fade" | "slide" | "scale";
  menu_animation_type?: "fade" | "slide" | "scale";
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: ThemeMode;
  security_settings?: {
    enable_ip_filtering: boolean;
    two_factor_auth: boolean;
    max_login_attempts: number;
  };
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export type SettingsFormData = Settings;

export interface SettingsResponse {
  data: Settings;
  error: null | {
    message: string;
  };
}

export interface UseSettingsFormReturn {
  form: any;
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  logoFile: File | null;
  faviconFile: File | null;
  handleLogoUpload: (file: File) => Promise<void>;
  handleFaviconUpload: (file: File) => Promise<void>;
  handleSettingsUpdate: (data: Settings) => Promise<void>;
  handleResetToDefault: () => Promise<void>;
}
