
/**
 * Security settings interface
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
 * Default security settings
 */
export const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
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

/**
 * Parse security settings from JSON
 */
export function parseSecuritySettings(settings: any): SecuritySettings {
  return {
    ip_blacklist: Array.isArray(settings?.ip_blacklist) ? settings.ip_blacklist : [],
    ip_whitelist: Array.isArray(settings?.ip_whitelist) ? settings.ip_whitelist : [],
    enable_ip_filtering: Boolean(settings?.enable_ip_filtering),
    two_factor_auth: Boolean(settings?.two_factor_auth),
    max_login_attempts: Number(settings?.max_login_attempts) || 5,
    rate_limit_requests: Number(settings?.rate_limit_requests) || 100,
    rate_limit_window_minutes: Number(settings?.rate_limit_window_minutes) || 5,
    session_timeout_minutes: Number(settings?.session_timeout_minutes) || 60,
    lockout_duration_minutes: Number(settings?.lockout_duration_minutes) || 30
  };
}
