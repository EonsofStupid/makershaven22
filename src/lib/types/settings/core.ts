export interface SiteSettings {
  site_title: string;
  tagline?: string;
  logo_url?: string;
  favicon_url?: string;
  metadata?: Record<string, unknown>;
}

export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}

export interface UserSettings {
  visual_editor_enabled: boolean;
  gamification_enabled: boolean;
  onboarding_completed: boolean;
  notifications_enabled?: boolean;
  display_preferences?: Record<string, unknown>;
}

export interface Settings {
  site: SiteSettings;
  security: SecuritySettings;
  user: UserSettings;
}