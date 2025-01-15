import { UserRole } from "../core/enums";

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
}

export interface AuthSession {
  user: AuthUser;
  expires_at?: number;
}

export interface AuthError {
  type: string;
  code?: string;
  message: string;
  stack?: string;
}

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  isRecovering: boolean;
  recoveryStep: string | null;
}

export type SecurityEventSeverity = 'info' | 'warning' | 'error' | 'critical';
export type SecurityEventCategory = 'auth' | 'data_access' | 'admin' | 'system';