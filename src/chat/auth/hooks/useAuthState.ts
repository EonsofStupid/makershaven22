
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../auth/store';

// Type for the state returned by the hook
interface AuthState {
  user: {
    id: string;
    email?: string;
    role?: string;
    [key: string]: any;
  } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
}

/**
 * Hook to access auth state in the chat module
 */
export function useAuthState(): AuthState {
  const { user, isLoading, error } = useAuthStore();
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
      isAuthenticated: !!user,
      error: error ? (error instanceof Error ? error : new Error(typeof error === 'string' ? error : 'Unknown error')) : null
    });
  }, [user, isLoading, error]);

  return state;
}
