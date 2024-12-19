import { Json } from '../core/json';

export interface SecuritySettings {
  id: string;
  ip_whitelist?: string[];
  rate_limits?: {
    requests_per_minute: number;
    requests_per_hour: number;
  };
  session_timeout?: number;
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
  event_type: 'login' | 'logout' | 'password_change' | 'security_update';
  user_id: string;
  ip_address: string;
  timestamp: string;
  details: Json;
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

export interface IPSecurityConfig {
  whitelist_enabled: boolean;
  whitelist: string[];
  blacklist: string[];
  geo_blocking_enabled: boolean;
  blocked_countries: string[];
}

export interface SessionSecurityConfig {
  max_sessions: number;
  session_timeout: number;
  refresh_token_rotation: boolean;
  persistent_sessions: boolean;
}