import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, AuthUser, AuthSession } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthStore extends AuthState {
  // Global auth actions
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  reset: () => void;
}

/**
 * Global auth store using Zustand
 * Handles authentication state and persistence
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      session: null,
      isLoading: false,
      error: null,
      isTransitioning: false,

      // Auth actions
      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          
          set({ 
            session: data.session,
            user: data.user as AuthUser,
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