import { GlobalState } from '../types';
import { AuthUser } from '@/lib/auth/types';

export const selectUser = (state: GlobalState): AuthUser | null => state.user;
export const selectSession = (state: GlobalState) => state.session;
export const selectIsLoading = (state: GlobalState) => state.isLoading;
export const selectError = (state: GlobalState) => state.error;
export const selectIsAuthenticated = (state: GlobalState) => !!state.session && !!state.user;

export const selectHasRole = (state: GlobalState) => (requiredRole: string | string[]) => {
  const user = state.user;
  if (!user?.role) return false;
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }
  return user.role === requiredRole;
};

export const selectIsAdmin = (state: GlobalState) => 
  state.user?.role === 'admin' || state.user?.role === 'super_admin';

export const selectIsMaker = (state: GlobalState) =>
  state.user?.role === 'maker' || selectIsAdmin(state);