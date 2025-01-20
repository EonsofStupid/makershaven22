export interface AuthError {
  type: string;
  code?: string;
  stack?: string;
  message: string;
}

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  isRecovering: boolean;
  recoveryStep: string | null;
}

export type SecurityEventSeverity = 'info' | 'warning' | 'error' | 'critical';
export type SecurityEventCategory = 'auth' | 'data' | 'system' | 'user';