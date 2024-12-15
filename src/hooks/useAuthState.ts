import { useAtom } from 'jotai';
import { authStateAtom } from '@/lib/store/atoms/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useAuthState = () => {
  const [authState, setAuthState] = useAtom(authStateAtom);
  const navigate = useNavigate();

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setAuthState({
        user: data.user,
        session: data.session,
        isLoading: false,
        error: null
      });

      toast.success('Successfully signed in');
      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to sign in');
      setAuthState(prev => ({ ...prev, error: error as Error }));
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setAuthState({
        user: null,
        session: null,
        isLoading: false,
        error: null
      });
      toast.success('Successfully signed out');
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  return {
    ...authState,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };
};