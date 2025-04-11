
import { AuthState } from '../auth-store';

/**
 * Auth store selectors
 */
export const authSelectors = {
  isAuthenticated: (state: AuthState) => !!state.session && !!state.user,
  isInitialized: (state: AuthState) => !state.isLoading && !state.isTransitioning,
  hasError: (state: AuthState) => !!state.error,
  getUser: (state: AuthState) => state.user,
  getSession: (state: AuthState) => state.session,
  getUserRole: (state: AuthState) => state.user?.role,
  canAccessAdminFeatures: (state: AuthState) => {
    const role = state.user?.role;
    return role === 'admin' || role === 'super_admin';
  }
};
