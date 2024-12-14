import { useAtom } from 'jotai';
import { useAuthStore } from './auth-store';
import {
  userAtom,
  sessionAtom,
  loadingStateAtom,
  authErrorAtom,
  isAuthenticatedAtom,
  hasRoleAtom
} from '../atoms/auth';

export const useAuth = () => {
  const { signIn, signOut } = useAuthStore();

  const [user] = useAtom(userAtom);
  const [session] = useAtom(sessionAtom);
  const [loadingState] = useAtom(loadingStateAtom);
  const [error] = useAtom(authErrorAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [hasRole] = useAtom(hasRoleAtom);

  return {
    // Global state
    user,
    session,
    isLoading: loadingState.isLoading,
    loadingMessage: loadingState.message,
    error,
    signIn,
    signOut,

    // Computed
    isAuthenticated,
    hasRole,
  };
};