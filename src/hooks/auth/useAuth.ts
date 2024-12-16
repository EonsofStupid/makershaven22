import { useAtom } from 'jotai';
import { useAuthStore } from '@/lib/store/auth/auth-store';
import {
  authUserAtom,
  authSessionAtom,
  authLoadingAtom,
  authErrorAtom,
  isAuthenticatedAtom
} from '@/lib/store/atoms/auth/auth-atoms';

export const useAuth = () => {
  const [user] = useAtom(authUserAtom);
  const [session] = useAtom(authSessionAtom);
  const [isLoading] = useAtom(authLoadingAtom);
  const [error] = useAtom(authErrorAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const { reset } = useAuthStore();

  const signOut = async () => {
    reset();
  };

  return {
    user,
    session,
    isLoading,
    error,
    isAuthenticated,
    signOut
  };
};