
import { JsonObject } from '../core/json';

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

export const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
  enable_ip_filtering: false,
  two_factor_auth: false,
  max_login_attempts: 5,
  ip_blacklist: [],
  ip_whitelist: [],
  rate_limit_requests: 100,
  session_timeout_minutes: 60,
  lockout_duration_minutes: 30,
  rate_limit_window_minutes: 5
};

export function parseSecuritySettings(data: unknown): SecuritySettings {
  if (!data) {
    return DEFAULT_SECURITY_SETTINGS;
  }

  try {
    let securityData: JsonObject;
    
    if (typeof data === 'string') {
      securityData = JSON.parse(data) as JsonObject;
    } else {
      securityData = data as JsonObject;
    }
    
    return {
      enable_ip_filtering: typeof securityData.enable_ip_filtering === 'boolean' 
        ? securityData.enable_ip_filtering as boolean 
        : DEFAULT_SECURITY_SETTINGS.enable_ip_filtering,
      
      two_factor_auth: typeof securityData.two_factor_auth === 'boolean'
        ? securityData.two_factor_auth as boolean
        : DEFAULT_SECURITY_SETTINGS.two_factor_auth,
      
      max_login_attempts: typeof securityData.max_login_attempts === 'number'
        ? securityData.max_login_attempts as number
        : DEFAULT_SECURITY_SETTINGS.max_login_attempts,
      
      ip_blacklist: Array.isArray(securityData.ip_blacklist)
        ? securityData.ip_blacklist as string[]
        : DEFAULT_SECURITY_SETTINGS.ip_blacklist,
      
      ip_whitelist: Array.isArray(securityData.ip_whitelist)
        ? securityData.ip_whitelist as string[]
        : DEFAULT_SECURITY_SETTINGS.ip_whitelist,
      
      rate_limit_requests: typeof securityData.rate_limit_requests === 'number'
        ? securityData.rate_limit_requests as number
        : DEFAULT_SECURITY_SETTINGS.rate_limit_requests,
      
      session_timeout_minutes: typeof securityData.session_timeout_minutes === 'number'
        ? securityData.session_timeout_minutes as number
        : DEFAULT_SECURITY_SETTINGS.session_timeout_minutes,
      
      lockout_duration_minutes: typeof securityData.lockout_duration_minutes === 'number'
        ? securityData.lockout_duration_minutes as number
        : DEFAULT_SECURITY_SETTINGS.lockout_duration_minutes,
      
      rate_limit_window_minutes: typeof securityData.rate_limit_window_minutes === 'number'
        ? securityData.rate_limit_window_minutes as number
        : DEFAULT_SECURITY_SETTINGS.rate_limit_window_minutes
    };
  } catch (error) {
    console.error('Error parsing security settings:', error);
    return DEFAULT_SECURITY_SETTINGS;
  }
}
