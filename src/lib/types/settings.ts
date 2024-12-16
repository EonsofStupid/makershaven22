import type { Json } from '@/integrations/supabase/types/database/base';
import type { Tables } from '@/integrations/supabase/types/database';

export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export type Settings = Tables['site_settings']['Row'];

export interface SecuritySettings {
  ip_whitelist: string[];
  ip_blacklist: string[];
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  max_login_attempts: number;
  lockout_duration_minutes: number;
  session_timeout_minutes: number;
}

export interface Theme {
  settings: Settings | null;
  mode: ThemeMode;
}

export interface ThemeContextType {
  theme: Theme | null;
  mode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  updateTheme: (settings: Settings) => Promise<void>;
}