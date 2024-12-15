export interface SecuritySettings {
  ip_whitelist: string[];
  ip_blacklist: string[];
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  max_login_attempts: number;
  lockout_duration_minutes: number;
  session_timeout_minutes: number;
}

export interface SecurityEvent {
  id: string;
  user_id?: string;
  event_type: string;
  severity: 'low' | 'medium' | 'high';
  details?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}