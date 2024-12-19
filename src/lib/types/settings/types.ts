import { Json } from '../core/json';

export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type MenuAnimationType = 'fade' | 'slide-down' | 'scale' | 'blur';

export interface Settings {
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
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  security_settings?: Json;
  transition_type?: TransitionType;
  menu_animation_type?: MenuAnimationType;
  theme_mode?: ThemeMode;
  state_version?: number;
  last_sync?: string;
}

export interface SecuritySettings {
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  max_login_attempts: number;
  lockout_duration_minutes: number;
  session_timeout_minutes: number;
  require_2fa: boolean;
  ip_whitelist: string[];
  ip_blacklist: string[];
  allowed_ip_ranges: string[];
  blocked_ip_ranges: string[];
}

export interface SettingsResponse {
  data: Settings;
  error: null | Error;
}

export interface UseSettingsFormReturn {
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  isResetting: boolean;
  logoFile: File | null;
  faviconFile: File | null;
  form: any;
  handleLogoUpload: (file: File) => Promise<void>;
  handleFaviconUpload: (file: File) => Promise<void>;
  handleSettingsUpdate: (settings: Settings) => Promise<void>;
  handleResetToDefault: () => Promise<void>;
}