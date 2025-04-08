
import { UserRole } from '../core/enums';
import { JsonObject } from '../core/json';

/**
 * Auth user interface
 */
export interface AuthUser {
  id: string;
  email?: string | null;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
  is_active?: boolean;
}

/**
 * Auth session interface
 */
export interface AuthSession {
  id: string;
  user: AuthUser;
  expires_at?: number;
  created_at: string;
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

// Create a helper to map Supabase session to our AuthSession
export function mapSupabaseSession(session: any): AuthSession | null {
  if (!session || !session.user) return null;
  
  return {
    id: session.access_token || session.user.id,
    user: {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
      username: session.user.user_metadata?.username,
      displayName: session.user.user_metadata?.display_name,
      user_metadata: session.user.user_metadata
    },
    expires_at: session.expires_at,
    created_at: new Date().toISOString()
  };
}
