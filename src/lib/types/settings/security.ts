
// Security settings types to match Supabase schema
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
