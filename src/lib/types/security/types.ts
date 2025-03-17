
import { Json, JsonObject } from '../core/json';

/**
 * Core security settings interface
 */
export interface SecuritySettings {
  enable_ip_filtering: boolean;
  two_factor_auth: boolean;
  max_login_attempts: number;
  ip_blacklist?: string[];
  ip_whitelist?: string[];
  rate_limit_requests?: number;
  session_timeout_minutes?: number;
  lockout_duration_minutes?: number;
  rate_limit_window_minutes?: number;
}

/**
 * Security log entry interface
 */
export interface SecurityLog {
  id: string;
  event_type: string;
  severity: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  details?: JsonObject;
  created_at: string;
}

/**
 * Parse security settings from JSON or object
 */
export function parseSecuritySettings(data: unknown): SecuritySettings {
  const defaultSettings: SecuritySettings = {
    enable_ip_filtering: false,
    two_factor_auth: false,
    max_login_attempts: 5
  };
  
  if (!data) {
    return defaultSettings;
  }
  
  try {
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    
    return {
      enable_ip_filtering: parsedData.enable_ip_filtering ?? defaultSettings.enable_ip_filtering,
      two_factor_auth: parsedData.two_factor_auth ?? defaultSettings.two_factor_auth,
      max_login_attempts: parsedData.max_login_attempts ?? defaultSettings.max_login_attempts,
      ip_blacklist: Array.isArray(parsedData.ip_blacklist) ? parsedData.ip_blacklist : [],
      ip_whitelist: Array.isArray(parsedData.ip_whitelist) ? parsedData.ip_whitelist : [],
      rate_limit_requests: parsedData.rate_limit_requests ?? 100,
      session_timeout_minutes: parsedData.session_timeout_minutes ?? 60,
      lockout_duration_minutes: parsedData.lockout_duration_minutes ?? 30,
      rate_limit_window_minutes: parsedData.rate_limit_window_minutes ?? 5
    };
  } catch (error) {
    console.error('Error parsing security settings:', error);
    return defaultSettings;
  }
}

/**
 * Prepare security settings for database
 */
export function prepareSecuritySettingsForDb(settings: SecuritySettings): JsonObject {
  return {
    enable_ip_filtering: settings.enable_ip_filtering,
    two_factor_auth: settings.two_factor_auth,
    max_login_attempts: settings.max_login_attempts,
    ip_blacklist: settings.ip_blacklist || [],
    ip_whitelist: settings.ip_whitelist || [],
    rate_limit_requests: settings.rate_limit_requests || 100,
    session_timeout_minutes: settings.session_timeout_minutes || 60,
    lockout_duration_minutes: settings.lockout_duration_minutes || 30,
    rate_limit_window_minutes: settings.rate_limit_window_minutes || 5
  };
}
