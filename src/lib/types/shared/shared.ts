import { Json } from '../core/json';

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: any) => Promise<void>;
}

export interface AuthUser {
  id: string;
  email?: string | null;
  role?: string;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

export interface AuthSession {
  user: AuthUser;
  expires_at?: number;
}

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
  updated_at?: string;
  updated_by?: string;
}

export interface UseSettingsFormReturn {
  form: any;
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  handleSettingsUpdate: (settings: Settings) => Promise<void>;
}

export interface AuthError {
  type: string;
  message: string;
  code?: string;
  stack?: string;
}

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  isRecovering: boolean;
  recoveryAttempts: number;
}

export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';
export type SecurityEventCategory = 'auth' | 'access' | 'data' | 'system';

export interface CmsContent {
  id: string;
  title: string;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status: 'draft' | 'published' | 'archived';
  type: 'page' | 'component' | 'template' | 'workflow';
  version?: number;
  created_by: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContentWithAuthor extends CmsContent {
  created_by: { display_name: string };
}