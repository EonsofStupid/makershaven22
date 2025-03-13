
// Security settings interfaces
export interface SecuritySettings {
  enable_ip_filtering: boolean;
  ip_blacklist?: string[];
  ip_whitelist?: string[];
  two_factor_auth: boolean;
  max_login_attempts: number;
  rate_limit_requests?: number;
  session_timeout_minutes?: number;
  lockout_duration_minutes?: number;
  rate_limit_window_minutes?: number;
}

export interface SecurityEvent {
  id: string;
  user_id?: string;
  event_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

export interface SecurityLog {
  id: string;
  user_id?: string;
  action: string;
  resource: string;
  details: string;
  success: boolean;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}
