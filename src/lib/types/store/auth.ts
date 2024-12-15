import type { User } from '@supabase/supabase-js';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  hasAccess?: boolean;
  reset?: () => void;
}

export interface SecuritySettings {
  maxLoginAttempts: number;
  lockoutDuration: number;
  sessionTimeout: number;
  ipWhitelist: string[];
  ipBlacklist: string[];
}