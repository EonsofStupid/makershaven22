import type { UserRole } from '@/lib/types/auth';

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  hasAccess: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  metadata: Record<string, any>;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: AuthUser;
}

export interface SecuritySettings {
  maxLoginAttempts: number;
  sessionTimeout: number;
  requireTwoFactor: boolean;
  allowedIPs: string[];
}