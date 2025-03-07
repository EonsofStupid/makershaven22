
export interface SecuritySettings {
  enable_ip_filtering: boolean;
  two_factor_auth: boolean;
  max_login_attempts: number;
  ip_whitelist?: string[];
  ip_blacklist?: string[];
  session_timeout_minutes?: number;
  lockout_duration_minutes?: number;
  rate_limit_requests?: number;
  rate_limit_window_minutes?: number;
}

export interface SecuritySettingsWithLogs extends SecuritySettings {
  last_updated?: string;
  updated_by?: string;
  logs?: SecurityLogEntry[];
}

export interface SecurityLogEntry {
  id: string;
  timestamp: string;
  event_type: string;
  ip_address?: string;
  user_id?: string;
  details?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface RateLimitConfig {
  requests_per_window: number;
  window_minutes: number;
  enabled: boolean;
}

export interface IpSecurityConfig {
  ip_whitelist: string[];
  ip_blacklist: string[];
  enable_ip_filtering: boolean;
}

export interface SessionSecurityConfig {
  session_timeout_minutes: number;
  max_concurrent_sessions: number;
  refresh_token_rotation: boolean;
}
