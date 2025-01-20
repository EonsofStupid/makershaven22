import { Json } from '../core/json';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';

export interface AuthUser {
  id: string;
  email?: string;
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
  attemptCount: number;
  lastAttempt?: Date;
  nextAttemptDelay: number;
}