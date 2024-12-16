import { useAtom } from 'jotai';
import { useAuthStore } from '@/lib/store/auth/auth-store';
import {
  authUserAtom,
  authSessionAtom,
  authLoadingAtom,
  authErrorAtom,
  isAuthenticatedAtom
} from '@/lib/store/atoms/auth/auth-atoms';
import type { AuthUser, AuthSession } from '@/lib/types/auth/base';

export const useAuth = () => {
  const [user] = useAtom(authUserAtom);
  const [session] = useAtom(authSessionAtom);
  const [isLoading] = useAtom(authLoadingAtom);
  const [error] = useAtom(authErrorAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const { setUser, setSession, setLoading, setError, reset } = useAuthStore();

  return {
    user,
    session,
    isLoading,
    error,
    isAuthenticated,
    setUser: (user: AuthUser | null) => {
      setUser(user);
    },
    setSession: (session: AuthSession | null) => {
      setSession(session);
    },
    setLoading: (isLoading: boolean) => {
      setLoading(isLoading);
    },
    setError: (error: Error | null) => {
      setError(error);
    },
    reset,
  };
};