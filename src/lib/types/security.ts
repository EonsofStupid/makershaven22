export interface SecuritySettings {
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  session_timeout_minutes: number;
  max_login_attempts: number;
  lockout_duration_minutes: number;
  ip_whitelist: string[];
  ip_blacklist: string[];
}

export interface SecurityEvent {
  id: string;
  user_id?: string;
  event_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

export interface SecurityAuditLog {
  id: string;
  user_id?: string;
  action_type: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  created_at: string;
}