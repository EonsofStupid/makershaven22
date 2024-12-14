import { useAtom } from 'jotai';
import { useAuthStore } from '@/lib/store/auth-store';
import {
  currentUserAtom,
  currentSessionAtom,
  authLoadingAtom,
  authErrorAtom,
} from '@/lib/store/atoms/auth/auth-atoms';

export const useAuth = () => {
  const { signIn, signOut } = useAuthStore();
  
  const [user] = useAtom(currentUserAtom);
  const [session] = useAtom(currentSessionAtom);
  const [isLoading] = useAtom(authLoadingAtom);
  const [error] = useAtom(authErrorAtom);

  return {
    // Global state
    user,
    session,
    isLoading,
    error,
    signIn,
    signOut,

    // Computed
    isAuthenticated: !!session,
    role: user?.role,
  };
};