import type { UserRole } from './roles';

export interface AuthUser {
  id: string;
  email?: string | null;
  role?: UserRole;
  username?: string;
  displayName?: string;
  lastSeen?: Date;
  isBanned?: boolean;
  banReason?: string;
  bannedAt?: Date;
  bannedBy?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

export interface AuthSession {
  user: AuthUser;
  expires_at?: number;
  access_token?: string;
  refresh_token?: string;
}

export interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | { message: string } | null;
  isTransitioning?: boolean;
}