
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../auth/store';
import type { Session } from '../../../auth/types/session';
import type { User } from '../../../auth/types/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
}

export function useAuthState(): AuthState {
  const { user, session, isLoading, error } = useAuthStore();
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null
  });

  useEffect(() => {
    setState({
      user: user || null,
      isLoading,
      isAuthenticated: !!session?.user,
      error: error ? new Error(typeof error === 'string' ? error : 'Unknown error') : null
    });
  }, [user, session, isLoading, error]);

  return state;
}
