import type { AuthUser, AuthSession } from '@/lib/types/auth/types';

/**
 * Auth store state interface
 */
export interface AuthState {
  // Session state
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  isTransitioning: boolean;
  error: Error | null;
  isOffline: boolean;
  
  // Actions
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: AuthSession | null) => Promise<void>;
}

/**
 * Auth store selectors
 */
export const authSelectors = {
  isAuthenticated: (state: AuthState) => !!state.session && !!state.user,
  isInitialized: (state: AuthState) => !state.isLoading && !state.isTransitioning,
  hasError: (state: AuthState) => !!state.error,
  isOffline: (state: AuthState) => state.isOffline,
  getUser: (state: AuthState) => state.user,
  getSession: (state: AuthState) => state.session
}; 