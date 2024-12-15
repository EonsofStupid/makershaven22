export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
  role?: UserRole;
}

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

export interface SessionConfig {
  timeout: number;
  refreshInterval: number;
  onExpired?: () => void;
  onRefresh?: () => void;
  onError?: (error: Error) => void;
}

export interface AuthErrorRecoveryState {
  error: Error;
  attemptCount: number;
  lastAttempt: Date;
  nextAttemptDelay: number;
}

export interface SecurityLog {
  id: string;
  user_id?: string;
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