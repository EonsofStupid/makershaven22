import { useAtom } from 'jotai';
import { useAuthStore } from '../auth-store';
import {
  userAtom,
  sessionAtom,
  authLoadingAtom,
  authErrorAtom,
  isAuthenticatedAtom,
  userRoleAtom
} from '../atoms/auth/auth-atoms';

export const useAuth = () => {
  const [user] = useAtom(userAtom);
  const [session] = useAtom(sessionAtom);
  const [isLoading] = useAtom(authLoadingAtom);
  const [error] = useAtom(authErrorAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [role] = useAtom(userRoleAtom);

  const { signIn, signOut } = useAuthStore();

  return {
    user,
    session,
    isLoading,
    error,
    isAuthenticated,
    role,
    signIn,
    signOut
  };
};