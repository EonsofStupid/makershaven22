export type UserRole = "subscriber" | "maker" | "admin" | "super_admin";

export interface AuthError {
  message: string;
  status?: number;
  type: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export interface AuthState {
  session: AuthSession | null;
  user: {
    id: string;
    email: string;
    role: UserRole;
  } | null;
  loading: boolean;
  error: AuthError | null;
}

export type AuthErrorRecoveryState = {
  error: AuthError | null;
  isRecovering: boolean;
  recoveryStep: string | null;
};

export type SecurityEventSeverity = "info" | "warning" | "error" | "critical";
export type SecurityEventCategory = "auth" | "data" | "system";