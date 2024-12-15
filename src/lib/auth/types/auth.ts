import type { Json } from '@/integrations/supabase/types/base';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  metadata?: Record<string, any>;
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

export interface AuthErrorRecoveryState {
  error: Error;
  attemptCount: number;
  lastAttempt: Date;
  nextAttemptDelay: number;
}

export interface SecurityLog {
  id: string;
  user_id: string;
  event_type: string;
  severity: string;
  details: Json;
  metadata: Json;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}

export interface SessionConfig {
  timeout: number;
  refreshInterval: number;
  persistKey: string;
}

export interface SessionState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  error: Error | null;
}

export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';
export type SecurityEventCategory = 'auth' | 'access' | 'data' | 'system';