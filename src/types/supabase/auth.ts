import type { User } from '@supabase/supabase-js';

export interface AuthSession {
  user: User | null;
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;
    provider_token?: string;
    provider_refresh_token?: string;
  } | null;
}

export interface AuthState {
  session: AuthSession | null;
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface UserProfile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}