
import { Json, JsonObject } from '../core/json';

/**
 * Security event severity levels
 */
export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Security event categories
 */
export type SecurityEventCategory = 'auth' | 'content' | 'admin' | 'system';

/**
 * Default security settings object structure
 */
export const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
  enable_ip_filtering: false,
  two_factor_auth: false,
  max_login_attempts: 5,
  ip_blacklist: [],
  ip_whitelist: [],
  rate_limit_requests: 100,
  rate_limit_window_minutes: 5,
  session_timeout_minutes: 60,
  lockout_duration_minutes: 30
};

/**
 * Security settings interface
 */
export interface SecuritySettings {
  enable_ip_filtering: boolean;
  two_factor_auth: boolean;
  max_login_attempts: number;
  ip_blacklist: string[];
  ip_whitelist: string[];
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
  [key: string]: any; // Allow additional properties
}

/**
 * Security event interface
 */
export interface SecurityEvent {
  id: string;
  category: SecurityEventCategory;
  severity: SecurityEventSeverity;
  event_type: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  details?: Record<string, any>;
  created_at: string;
}

/**
 * Security audit log interface
 */
export interface SecurityAuditLog {
  id: string;
  event_type: string;
  severity: SecurityEventSeverity;
  action: string;
  user_id?: string;
  resource_type?: string;
  resource_id?: string;
  previous_state?: Record<string, any>;
  new_state?: Record<string, any>;
  metadata?: Record<string, any>;
  created_at: string;
}

/**
 * Parse security settings from JSON to typed SecuritySettings
 */
export function parseSecuritySettings(data: any): SecuritySettings {
  if (!data) {
    return { ...DEFAULT_SECURITY_SETTINGS };
  }

  return {
    enable_ip_filtering: Boolean(data.enable_ip_filtering),
    two_factor_auth: Boolean(data.two_factor_auth),
    max_login_attempts: Number(data.max_login_attempts) || DEFAULT_SECURITY_SETTINGS.max_login_attempts,
    ip_blacklist: Array.isArray(data.ip_blacklist) ? data.ip_blacklist : DEFAULT_SECURITY_SETTINGS.ip_blacklist,
    ip_whitelist: Array.isArray(data.ip_whitelist) ? data.ip_whitelist : DEFAULT_SECURITY_SETTINGS.ip_whitelist,
    rate_limit_requests: Number(data.rate_limit_requests) || DEFAULT_SECURITY_SETTINGS.rate_limit_requests,
    rate_limit_window_minutes: Number(data.rate_limit_window_minutes) || DEFAULT_SECURITY_SETTINGS.rate_limit_window_minutes,
    session_timeout_minutes: Number(data.session_timeout_minutes) || DEFAULT_SECURITY_SETTINGS.session_timeout_minutes,
    lockout_duration_minutes: Number(data.lockout_duration_minutes) || DEFAULT_SECURITY_SETTINGS.lockout_duration_minutes,
  };
}

/**
 * Prepare security settings for database storage
 */
export function prepareSecuritySettingsForDb(settings: Partial<SecuritySettings>): JsonObject {
  const currentSettings = { ...DEFAULT_SECURITY_SETTINGS, ...settings };
  return currentSettings as JsonObject;
}
