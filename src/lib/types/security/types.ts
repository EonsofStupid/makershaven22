import { Json } from '../core/json';

export interface SecuritySettings {
  max_login_attempts: number;
  lockout_duration_minutes: number;
  session_timeout_minutes: number;
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  ip_whitelist: string[];
  ip_blacklist: string[];
  two_factor_required: boolean;
  password_expiry_days: number;
  audit_log_retention_days: number;
}

export interface SecurityLog {
  id: string;
  event_type: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  user_id: string | null;
  metadata: Json | null;
  profiles?: {
    username: string;
    display_name: string;
  };
}