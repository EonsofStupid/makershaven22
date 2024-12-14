import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, AuthUser, AuthSession } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthStore extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: false,
      error: null,
      isTransitioning: false,

      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

          const authSession: AuthSession = {
            user: {
              id: data.user.id,
              email: data.user.email,
              role: profile?.role || 'subscriber',
              ...data.user.user_metadata
            },
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_in: data.session.expires_in
          };
          
          set({ 
            session: authSession,
            user: authSession.user,
            isLoading: false 
          });
          
          toast.success('Successfully signed in');
        } catch (error) {
          console.error('Sign in error:', error);
          set({ error: error as Error, isLoading: false });
          toast.error('Failed to sign in');
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true, error: null });
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          set({ 
            user: null, 
            session: null, 
            isLoading: false 
          });
          
          toast.success('Successfully signed out');
        } catch (error) {
          console.error('Sign out error:', error);
          set({ error: error as Error, isLoading: false });
          toast.error('Failed to sign out');
        }
      },

      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setTransitioning: (isTransitioning) => set({ isTransitioning }),
      reset: () => set({ 
        user: null, 
        session: null, 
        isLoading: false, 
        error: null,
        isTransitioning: false 
      }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ 
        user: state.user, 
        session: state.session 
      }),
    }
  )
);