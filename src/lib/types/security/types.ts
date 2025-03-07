
export interface SecuritySettings {
  enable_ip_filtering: boolean;
  two_factor_auth: boolean;
  max_login_attempts: number;
  rate_limit_requests: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  rate_limit_window_minutes: number;
  ip_blacklist?: string[];
  ip_whitelist?: string[];
}

export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';
export type SecurityEventCategory = 'auth' | 'access' | 'data' | 'system';

export interface SecurityEvent {
  id: string;
  user_id?: string;
  ip_address?: string;
  category: SecurityEventCategory;
  severity: SecurityEventSeverity;
  event_type: string;
  description: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}
