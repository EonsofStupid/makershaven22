import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth/auth-store';
import { useAtom } from 'jotai';
import { authUserAtom, authSessionAtom } from '@/lib/store/atoms/auth';
import type { AuthUser, AuthSession } from '@/lib/types/auth';

export const useAuth = () => {
  const authStore = useAuthStore();
  const [user, setUser] = useAtom(authUserAtom);
  const [session, setSession] = useAtom(authSessionAtom);

  // Sync Zustand state with Jotai atoms
  useEffect(() => {
    if (authStore.user !== user) {
      setUser(authStore.user);
    }
    if (authStore.session !== session) {
      setSession(authStore.session);
    }
  }, [authStore.user, authStore.session, user, session, setUser, setSession]);

  const signOut = async () => {
    authStore.reset();
    setUser(null);
    setSession(null);
  };

  return {
    user: authStore.user,
    session: authStore.session,
    isLoading: authStore.isLoading,
    error: authStore.error,
    isAuthenticated: !!authStore.session,
    signOut,
    setUser: (user: AuthUser | null) => {
      authStore.setUser(user);
      setUser(user);
    },
    setSession: (session: AuthSession | null) => {
      authStore.setSession(session);
      setSession(session);
    }
  };
};