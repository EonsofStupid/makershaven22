export interface SecuritySettings {
  enable_ip_filtering: boolean;
  two_factor_auth: boolean;
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
}