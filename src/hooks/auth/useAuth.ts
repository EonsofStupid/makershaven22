import { useAtom } from 'jotai';
import { sessionAtom, userAtom } from '@/lib/store/atoms/auth';
import type { AuthUser } from '@/lib/auth/types';

export const useAuth = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const [user, setUser] = useAtom(userAtom);

  const setAuthState = (state: { 
    user?: AuthUser | null;
    session?: any;
    isLoading?: boolean;
    error?: Error | null;
  }) => {
    if ('user' in state) setUser(state.user);
    if ('session' in state) setSession(state.session);
  };

  return {
    session,
    user,
    setAuthState,
    isAuthenticated: !!session && !!user,
  };
};