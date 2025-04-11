
import { Json } from '../core/json';

export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';
export type SecurityEventCategory = 'auth' | 'content' | 'admin' | 'system';

export interface SecuritySettings {
  id: string;
  ip_whitelist?: string[];
  ip_blacklist?: string[];
  rate_limit_requests?: number;
  rate_limit_window_minutes?: number;
  session_timeout_minutes?: number;
  max_login_attempts?: number;
  lockout_duration_minutes?: number;
  two_factor_required?: boolean;
  password_requirements?: {
    min_length: number;
    require_special: boolean;
    require_numbers: boolean;
    require_uppercase: boolean;
  };
}

export interface SecurityLog {
  id: string;
  event_type: string;
  severity: SecurityEventSeverity;
  category: SecurityEventCategory;
  user_id: string;
  ip_address: string;
  timestamp: string;
  details: Json;
  created_at?: string;
  profiles?: {
    display_name: string;
    username: string;
  };
}

export interface SecurityAuditLog {
  id: string;
  action: string;
  user_id: string;
  resource_type: string;
  resource_id: string;
  changes: Json;
  timestamp: string;
  ip_address: string;
}

export interface RateLimitConfig {
  enabled: boolean;
  requests_per_minute: number;
  requests_per_hour: number;
  block_duration: number;
}

export interface SessionSecurityConfig {
  max_sessions: number;
  session_timeout: number;
  refresh_token_rotation: boolean;
  persistent_sessions: boolean;
}

// Re-export everything from types.ts for backward compatibility
export * from './types';
