import { useAtom } from 'jotai';
import { useAuthStore } from '@/lib/store/auth-store';
import {
  userAtom,
  sessionAtom,
  loadingStateAtom,
  authErrorAtom,
  isAuthenticatedAtom
} from '@/lib/store/atoms/auth/auth-atoms';

export const useAuth = () => {
  const { signIn, signOut } = useAuthStore();
  
  const [user] = useAtom(userAtom);
  const [session] = useAtom(sessionAtom);
  const [loadingState] = useAtom(loadingStateAtom);
  const [error] = useAtom(authErrorAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

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
    role: user?.role
  };
};