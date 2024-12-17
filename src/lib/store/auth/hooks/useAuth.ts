import { useCallback } from 'react';
import { useAuthStore } from '../store/auth-store';
import type { AuthUser, AuthSession } from '../types/auth';

export const useAuth = () => {
  const store = useAuthStore();

  const updateSession = useCallback(async (session: AuthSession | null) => {
    await store.handleSessionUpdate(session);
  }, [store]);

  const updateUser = useCallback((user: AuthUser | null) => {
    store.setUser(user);
  }, [store]);

  return {
    ...store,
    updateSession,
    updateUser,
  };
};