import type { AuthUser, AuthSession } from '@/lib/auth/types';

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
}

export interface AuthSelectors {
  isAuthenticated: boolean;
  hasRole: (role: string | string[]) => boolean;
  isAdmin: boolean;
  isMaker: boolean;
}