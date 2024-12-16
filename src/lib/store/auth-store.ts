import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types
interface AuthUser {
  id: string;
  email?: string | null;
  role?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

interface AuthState {
  session: Session | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
}

// Atoms
export const sessionAtom = atomWithStorage<Session | null>('auth_session', null);
export const userAtom = atomWithStorage<AuthUser | null>('auth_user', null);
export const loadingAtom = atom<boolean>(true);
export const errorAtom = atom<Error | null>(null);
export const isTransitioningAtom = atom<boolean>(false);

// Custom hook for auth store
export const useAuthStore = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [isTransitioning, setIsTransitioning] = useAtom(isTransitioningAtom);

  const signOut = async () => {
    try {
      setIsTransitioning(true);
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      
      setSession(null);
      setUser(null);
      toast.success("Successfully signed out");
    } catch (err) {
      console.error("Sign out error:", err);
      setError(err instanceof Error ? err : new Error('Failed to sign out'));
      toast.error("Failed to sign out");
    } finally {
      setIsTransitioning(false);
    }
  };

  const reset = () => {
    setSession(null);
    setUser(null);
    setError(null);
    setLoading(false);
    setIsTransitioning(false);
  };

  return {
    session,
    user,
    isLoading,
    error,
    isTransitioning,
    setSession,
    setUser,
    setLoading,
    setError,
    setIsTransitioning,
    signOut,
    reset
  };
};