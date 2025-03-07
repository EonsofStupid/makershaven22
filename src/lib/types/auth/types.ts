
import { Json } from '../core/json';
import { UserRole } from '../core/enums';

export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

export interface AuthSession {
  user: AuthUser;
  expires_at?: number;
}

export interface AuthError {
  type: string;
  code?: string;
  message: string;
  stack?: string;
}

export interface Profile {
  id: string;
  username: string;
  email?: string;
  avatar_url?: string;
  display_name?: string;
  bio?: string;
  website?: string;
  location?: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
  last_seen?: string;
  onboarding_completed?: boolean;
  two_factor_enabled?: boolean;
  is_banned?: boolean;
  banned_at?: string;
  banned_by?: string;
  ban_reason?: string;
  last_login_at?: string;
  current_level?: number;
  total_points?: number;
  next_level_points?: number;
}
