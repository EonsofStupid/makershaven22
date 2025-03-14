
import { Json } from "../core/json";

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

// Type guards for security settings
export function isSecuritySettings(value: unknown): value is SecuritySettings {
  if (!value || typeof value !== 'object') return false;
  const sec = value as Partial<SecuritySettings>;
  
  return (
    typeof sec.enable_ip_filtering === 'boolean' &&
    typeof sec.two_factor_auth === 'boolean' &&
    typeof sec.max_login_attempts === 'number'
  );
}

// Convert from database JSON to SecuritySettings
export function parseSecuritySettings(value: Json | null | undefined): SecuritySettings {
  const defaultSettings: SecuritySettings = {
    enable_ip_filtering: false,
    two_factor_auth: false,
    max_login_attempts: 5
  };
  
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return defaultSettings;
  }
  
  const secObj = value as Record<string, any>;
  
  const result: SecuritySettings = {
    enable_ip_filtering: typeof secObj.enable_ip_filtering === 'boolean' ? 
      secObj.enable_ip_filtering : defaultSettings.enable_ip_filtering,
      
    two_factor_auth: typeof secObj.two_factor_auth === 'boolean' ? 
      secObj.two_factor_auth : defaultSettings.two_factor_auth,
      
    max_login_attempts: typeof secObj.max_login_attempts === 'number' ? 
      secObj.max_login_attempts : defaultSettings.max_login_attempts
  };
  
  // Optional properties
  if (Array.isArray(secObj.ip_blacklist)) {
    result.ip_blacklist = secObj.ip_blacklist.filter((ip: any) => typeof ip === 'string');
  }
  
  if (Array.isArray(secObj.ip_whitelist)) {
    result.ip_whitelist = secObj.ip_whitelist.filter((ip: any) => typeof ip === 'string');
  }
  
  if (typeof secObj.rate_limit_requests === 'number') {
    result.rate_limit_requests = secObj.rate_limit_requests;
  }
  
  if (typeof secObj.session_timeout_minutes === 'number') {
    result.session_timeout_minutes = secObj.session_timeout_minutes;
  }
  
  if (typeof secObj.lockout_duration_minutes === 'number') {
    result.lockout_duration_minutes = secObj.lockout_duration_minutes;
  }
  
  if (typeof secObj.rate_limit_window_minutes === 'number') {
    result.rate_limit_window_minutes = secObj.rate_limit_window_minutes;
  }
  
  return result;
}
