export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  profile?: Profile;
}

export interface Profile {
  id: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  location?: string;
  role: UserRole;
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
  pin_enabled?: boolean;
  pin_hash?: string;
  last_password_login?: string;
  failed_pin_attempts?: number;
  failed_login_attempts?: number;
  lockout_until?: string;
}

export interface SecurityLog {
  id: string;
  user_id?: string;
  event_type: string;
  severity: string;
  details?: any;
  ip_address?: string;
  user_agent?: string;
  metadata?: any;
  created_at?: string;
}