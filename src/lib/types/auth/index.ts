import { Database } from '@/integrations/supabase/types';
import { UserRole } from '../base';

export type AuthUser = {
  id: string;
  email: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: Record<string, any>;
  created_at?: string;
  last_sign_in_at?: string;
};

export type AuthSession = {
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
};

export type AuthState = {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  hasAccess: boolean;
};

export type AuthError = {
  code: string;
  message: string;
  details?: Record<string, any>;
  stack?: string;
};

export type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole | UserRole[];
  fallbackPath?: string;
};

export type AuthStoreActions = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setError: (error: Error | null) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  reset: () => void;
};

export type AuthStore = AuthState & AuthStoreActions;