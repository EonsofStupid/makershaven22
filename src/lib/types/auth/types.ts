import type { UserRole } from '../core/enums';
import type { JsonObject } from '../core/json';

/**
 * Auth user interface
 */
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  display_name?: string;
  avatar_url?: string;
  metadata?: JsonObject;
  created_at?: string;
  updated_at?: string;
  last_sign_in?: string;
  email_verified?: boolean;
  is_active: boolean;
}

/**
 * Auth session interface
 */
export interface AuthSession {
  id: string;
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
  expires_at: string;
  created_at: string;
  updated_at?: string;
  metadata?: JsonObject;
}

/**
 * Security event severity levels
 */
export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Security event categories
 */
export type SecurityEventCategory = 
  | 'authentication'
  | 'authorization'
  | 'data_access'
  | 'system'
  | 'user_management';

/**
 * Security event interface
 */
export interface SecurityEvent {
  id: string;
  user_id?: string;
  event_type: string;
  severity: SecurityEventSeverity;
  category: SecurityEventCategory;
  description: string;
  metadata?: JsonObject;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
}

export type AuthErrorType = 
  | 'authentication' 
  | 'authorization' 
  | 'validation' 
  | 'server' 
  | 'network'
  | 'unknown';

export interface AuthError {
  type: AuthErrorType;
  code?: string;
  message: string;
  stack?: string;
}

export interface AuthErrorRecoveryState {
  attemptCount: number;
  lastAttempt?: Date;
  nextAttemptDelay: number;
}

export interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | { message: string } | null;
  isTransitioning?: boolean;
}
