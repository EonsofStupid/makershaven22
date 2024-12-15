import { BaseEntity, UserRole } from './base';

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

export interface Profile extends BaseEntity {
  username?: string;
  display_name?: string;
  avatar_url?: string;
  role?: UserRole;
  bio?: string;
  website?: string;
  location?: string;
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