import { Json } from "../core/json";

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
  logo_url?: string;
  favicon_url?: string;
  transition_type: 'fade' | 'slide' | 'scale';
  menu_animation_type?: 'fade' | 'slide-down' | 'scale' | 'blur';
  theme_mode?: 'light' | 'dark' | 'system';
  updated_at?: string;
  updated_by?: string;
  security_settings?: {
    enable_ip_filtering: boolean;
    two_factor_auth: boolean;
    max_login_attempts: number;
  };
}

export type SettingsFormData = Settings;

export interface SettingsState {
  settings: Partial<Settings>;
  updateSetting: (key: keyof Settings, value: any) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  saveTransformationRule: (rule: any) => Promise<void>;
}

export interface UseSettingsFormReturn {
  form: any;
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  handleSettingsUpdate: (settings: Settings) => Promise<void>;
}