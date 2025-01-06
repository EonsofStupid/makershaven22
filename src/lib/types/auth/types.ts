import { Json } from '../core/json';

export interface AuthError {
  type: string;
  message: string;
  code?: string;
  stack?: string;
}

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  isRecovering: boolean;
  recoveryAttempts: number;
}

export type SecurityEventSeverity = 'info' | 'warn' | 'error' | 'critical';
export type SecurityEventCategory = 'auth' | 'access' | 'data' | 'system';