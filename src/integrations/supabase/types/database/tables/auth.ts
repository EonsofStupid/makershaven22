import type { UserRole } from '../../core/enums';

export interface Profile {
  id: string;
  username?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
  role?: UserRole;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
  created_at?: string;
  updated_at?: string;
  last_seen?: string | null;
  is_banned?: boolean;
  ban_reason?: string | null;
  banned_at?: string | null;
  banned_by?: string | null;
  two_factor_enabled?: boolean;
  two_factor_secret?: string | null;
  onboarding_completed?: boolean;
  gamification_enabled?: boolean;
  visual_editor_enabled?: boolean;
  last_login_at?: string | null;
  pin_enabled?: boolean;
  pin_hash?: string | null;
  last_password_login?: string | null;
  failed_pin_attempts?: number;
  failed_login_attempts?: number;
  lockout_until?: string | null;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  loading: boolean;
  error: Error | null;
}