import { Json } from '../core/base';

export interface SecuritySettings {
  enable_ip_filtering: boolean;
  ip_whitelist: string[];
  ip_blacklist: string[];
  max_login_attempts: number;
  two_factor_auth: boolean;
  password_requirements: {
    min_length: number;
    require_special: boolean;
    require_numbers: boolean;
    require_uppercase: boolean;
  };
}

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
  security_settings?: SecuritySettings;
  theme_mode?: 'light' | 'dark' | 'system';
  transition_type?: 'fade' | 'slide' | 'scale';
  menu_animation_type?: 'fade' | 'slide-down' | 'scale' | 'blur';
  updated_at?: string;
  updated_by?: string;
}

export type SiteSettings = Settings;

export interface SettingsFormData extends Settings {}

export interface UseSettingsFormReturn {
  form: any;
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  handleSettingsUpdate: (settings: Settings) => Promise<void>;
}

export interface SettingsState {
  settings: Partial<Settings>;
  updateSetting: (key: keyof Settings, value: any) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  saveTransformationRule?: (rule: any) => Promise<void>;
}