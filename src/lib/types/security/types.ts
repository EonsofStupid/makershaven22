
import { z } from "zod";
import { Json } from "../core/json";

/**
 * Security settings interface - defines all security configuration options
 */
export interface SecuritySettings {
  // Core security settings
  enable_ip_filtering: boolean;
  two_factor_auth: boolean;
  max_login_attempts: number;
  
  // Optional security settings
  ip_blacklist?: string[];
  ip_whitelist?: string[];
  rate_limit_requests?: number;
  session_timeout_minutes?: number;
  lockout_duration_minutes?: number;
  rate_limit_window_minutes?: number;
}

/**
 * Security event interface for tracking security-related events
 */
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

/**
 * Security log interface for detailed security audit logging
 * Aligns with security_logs table in database
 */
export interface SecurityLog {
  id: string;
  event_type: string;
  severity: string;
  user_id?: string;
  ip_address?: string;
  details?: Json;
  created_at?: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}

/**
 * Zod schema for validating security settings
 */
export const securitySettingsSchema = z.object({
  enable_ip_filtering: z.boolean(),
  two_factor_auth: z.boolean(),
  max_login_attempts: z.number().min(1).max(10),
  ip_blacklist: z.array(z.string()).optional(),
  ip_whitelist: z.array(z.string()).optional(),
  rate_limit_requests: z.number().min(1).optional(),
  session_timeout_minutes: z.number().min(1).optional(),
  lockout_duration_minutes: z.number().min(1).optional(),
  rate_limit_window_minutes: z.number().min(1).optional()
});

/**
 * Type guard to check if a value matches the SecuritySettings interface
 */
export function isSecuritySettings(value: unknown): value is SecuritySettings {
  if (!value || typeof value !== 'object') return false;
  const sec = value as Partial<SecuritySettings>;
  
  return (
    typeof sec.enable_ip_filtering === 'boolean' &&
    typeof sec.two_factor_auth === 'boolean' &&
    typeof sec.max_login_attempts === 'number'
  );
}

/**
 * Default security settings to use when none are provided
 */
export const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
  enable_ip_filtering: false,
  two_factor_auth: false,
  max_login_attempts: 5
};

/**
 * Safely parses JSON data into a SecuritySettings object
 */
export function parseSecuritySettings(value: Json | null | undefined): SecuritySettings {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { ...DEFAULT_SECURITY_SETTINGS };
  }
  
  const secObj = value as Record<string, any>;
  
  const result: SecuritySettings = {
    enable_ip_filtering: typeof secObj.enable_ip_filtering === 'boolean' ? 
      secObj.enable_ip_filtering : DEFAULT_SECURITY_SETTINGS.enable_ip_filtering,
      
    two_factor_auth: typeof secObj.two_factor_auth === 'boolean' ? 
      secObj.two_factor_auth : DEFAULT_SECURITY_SETTINGS.two_factor_auth,
      
    max_login_attempts: typeof secObj.max_login_attempts === 'number' ? 
      secObj.max_login_attempts : DEFAULT_SECURITY_SETTINGS.max_login_attempts
  };
  
  // Handle optional properties
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

/**
 * Prepares security settings for database storage
 */
export function prepareSecuritySettingsForDb(settings: SecuritySettings): Record<string, any> {
  return {
    enable_ip_filtering: settings.enable_ip_filtering,
    two_factor_auth: settings.two_factor_auth,
    max_login_attempts: settings.max_login_attempts,
    ip_blacklist: settings.ip_blacklist || [],
    ip_whitelist: settings.ip_whitelist || [],
    rate_limit_requests: settings.rate_limit_requests,
    session_timeout_minutes: settings.session_timeout_minutes,
    lockout_duration_minutes: settings.lockout_duration_minutes,
    rate_limit_window_minutes: settings.rate_limit_window_minutes
  };
}
