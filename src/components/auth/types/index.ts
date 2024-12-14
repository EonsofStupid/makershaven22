export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'guest';

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

export interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | null;
  isTransitioning?: boolean;
  reset?: () => void;
}