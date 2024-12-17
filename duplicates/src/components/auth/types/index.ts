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

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  loading: boolean;
  error: Error | null;
}