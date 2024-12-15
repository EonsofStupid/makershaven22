import { useAtom } from 'jotai';
import { authSyncAtom } from '@/lib/store/atoms/auth/auth-atoms';
import { useAuthStore } from '@/lib/store/auth-store';
import type { AuthUser, AuthSession } from '@/lib/types/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useAtom(authSyncAtom);
  const { signIn, signOut } = useAuthStore();

  return {
    user: authState.user,
    session: authState.session,
    isLoading: authState.isLoading,
    error: authState.error,
    signIn,
    signOut,
    setAuthState
  };
};