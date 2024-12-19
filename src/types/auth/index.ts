export interface AuthUser {
  id: string;
  email?: string;
  role?: string;
  aud: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: AuthUser;
}

export interface AuthStore {
  session: AuthSession | null;
  user: AuthUser | null;
  loading: boolean;
  initialized: boolean;
}

export interface SessionConfig {
  timeoutMinutes: number;
  maxInactiveDays: number;
  requireReauthAfterInactivity: boolean;
}

export interface SessionState {
  isActive: boolean;
  lastActivity: Date | null;
  expiresAt: Date | null;
}