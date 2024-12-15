export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  user_metadata?: Record<string, any>;
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface AuthErrorRecoveryState {
  error: Error;
  attemptCount: number;
  lastAttempt: Date;
  nextAttemptDelay: number;
}

export interface SecurityEventSeverity {
  type: 'info' | 'warning' | 'error' | 'critical';
}

export interface SecurityEventCategory {
  type: 'auth' | 'content' | 'system' | 'user';
}

export interface SecurityLog {
  id: string;
  user_id: string;
  event_type: string;
  severity: string;
  details: Json;
  metadata: Record<string, any>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}