
import { UserRole } from '../core/enums';

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
