import { useAtom } from 'jotai';
import { useAuthStore } from './auth-store';
import {
  userAtom,
  sessionAtom,
  loadingStateAtom,
  authErrorAtom,
  isAuthenticatedAtom,
  userRoleAtom,
} from '../atoms/auth';

export const useAuth = () => {
  const { signIn, signOut } = useAuthStore();

  const [user] = useAtom(userAtom);
  const [session] = useAtom(sessionAtom);
  const [isLoading] = useAtom(loadingStateAtom);
  const [error] = useAtom(authErrorAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [role] = useAtom(userRoleAtom);

  return {
    // Global state
    user,
    session,
    isLoading,
    error,
    signIn,
    signOut,

    // Computed
    isAuthenticated,
    role,
  };
};