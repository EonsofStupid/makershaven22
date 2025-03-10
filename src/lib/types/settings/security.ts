
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

// Extended security settings interface with logs and metadata
export interface SecuritySettingsWithAudit extends SecuritySettings {
  last_updated?: string;
  updated_by?: string;
}

// Security event types
export interface SecurityEvent {
  id: string;
  timestamp: string;
  event_type: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  user_id?: string;
  ip_address?: string;
  details?: string;
  metadata?: any;
}
