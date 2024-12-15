import { UserRole } from './base';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  metadata?: Record<string, any>;
}

export interface AuthSession {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  user: AuthUser;
}

export interface Profile {
  id: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  role?: UserRole;
  bio?: string;
  website?: string;
  location?: string;
  created_at: string;
  updated_at: string;
  last_seen?: string;
  is_banned?: boolean;
  ban_reason?: string;
  banned_at?: string;
  banned_by?: string;
  two_factor_enabled?: boolean;
  two_factor_secret?: string;
  onboarding_completed?: boolean;
  gamification_enabled?: boolean;
  visual_editor_enabled?: boolean;
  last_login_at?: string;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
}

export interface PinAuthConfig {
  maxAttempts: number;
  lockoutDuration: number;
  pinLength: number;
}