export interface SecuritySettings {
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  max_failed_logins: number;
  lockout_duration_minutes: number;
  session_timeout_minutes: number;
  require_2fa: boolean;
  allowed_ip_ranges: string[];
  blocked_ip_ranges: string[];
}

export interface SecurityLog {
  id: string;
  event_type: string;
  ip_address: string;
  created_at: string;
  user_id?: string;
  metadata?: Record<string, any>;
  profiles?: {
    username?: string;
    display_name?: string;
  };
}