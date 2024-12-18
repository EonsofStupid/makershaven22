export interface SessionConfig {
  timeoutMinutes: number;
  maxInactiveDays: number;
  requireReauthAfterInactivity: boolean;
}

export interface SessionState {
  isActive: boolean;
  lastActivity: Date | null;
  expiresAt: Date | null;
  requiresReauth: boolean;
}