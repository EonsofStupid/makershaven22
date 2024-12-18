import { Session, User } from '@supabase/supabase-js';
import { UserRole } from '../base/enums';

export interface AuthUser extends User {
  role?: UserRole;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface AuthSession extends Session {
  user: AuthUser;
}

export interface AuthStore {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
}