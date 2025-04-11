
import { Json, JsonObject } from '../core/json';

/**
 * Security settings interface defining the security configuration
 */
export interface SecuritySettings {
  ip_blacklist: string[];
  ip_whitelist: string[];
  enable_ip_filtering: boolean;
  two_factor_auth: boolean;
  max_login_attempts: number;
  rate_limit_requests: number;
  rate_limit_window_minutes: number;
  session_timeout_minutes: number;
  lockout_duration_minutes: number;
}

/**
 * Security event severity levels
 */
export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Security event categories
 */
export type SecurityEventCategory = 'auth' | 'data_access' | 'admin' | 'system' | 'user';

/**
 * Security event interface
 */
export interface SecurityEvent {
  id: string;
  user_id?: string;
  event_type: string;
  severity: SecurityEventSeverity;
  category: SecurityEventCategory;
  details: JsonObject;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
}

/**
 * Parse security settings from JSON to typed SecuritySettings
 */
export function parseSecuritySettings(data: any): SecuritySettings {
  // Default security settings
  const defaultSettings: SecuritySettings = {
    ip_blacklist: [],
    ip_whitelist: [],
    enable_ip_filtering: false,
    two_factor_auth: false,
    max_login_attempts: 5,
    rate_limit_requests: 100,
    rate_limit_window_minutes: 5,
    session_timeout_minutes: 60,
    lockout_duration_minutes: 30
  };

  // If no data, return default
  if (!data) {
    return defaultSettings;
  }

  // Parse from JSON if it's a string
  let settings = typeof data === 'string' ? JSON.parse(data) : data;

  // Return merged settings
  return {
    ...defaultSettings,
    ...settings,
    // Ensure arrays are properly initialized
    ip_blacklist: Array.isArray(settings.ip_blacklist) ? settings.ip_blacklist : defaultSettings.ip_blacklist,
    ip_whitelist: Array.isArray(settings.ip_whitelist) ? settings.ip_whitelist : defaultSettings.ip_whitelist,
  };
}
