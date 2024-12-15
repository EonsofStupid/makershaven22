import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { AuthUser, AuthSession } from '@/lib/types';
import { toast } from 'sonner';

interface AuthStore {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  hasAccess: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setError: (error: Error | null) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: true,
      error: null,
      isTransitioning: false,
      hasAccess: false,

      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
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

          set({ 
            user: {
              id: data.user.id,
              email: data.user.email!,
              role: profile?.role || 'subscriber',
              metadata: data.user.user_metadata
            },
            session: data.session,
            isLoading: false,
            hasAccess: true
          });
          
          toast.success('Successfully signed in');
        } catch (error) {
          console.error('Sign in error:', error);
          set({ 
            error: error as Error,
            isLoading: false,
            hasAccess: false
          });
          toast.error('Failed to sign in');
        }
      },

      signOut: async () => {
        set({ isLoading: true, error: null });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          set({ 
            user: null,
            session: null,
            isLoading: false,
            hasAccess: false
          });
          
          toast.success('Successfully signed out');
        } catch (error) {
          console.error('Sign out error:', error);
          set({ 
            error: error as Error,
            isLoading: false
          });
          toast.error('Failed to sign out');
        }
      },

      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setError: (error) => set({ error }),
      setTransitioning: (isTransitioning) => set({ isTransitioning }),
      reset: () => set({ 
        user: null,
        session: null,
        isLoading: false,
        error: null,
        isTransitioning: false,
        hasAccess: false
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