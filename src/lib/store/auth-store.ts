import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser, AuthSession } from '../types/auth';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: true,
      error: null,
      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          set({ 
            session: data.session as AuthSession,
            user: data.user as AuthUser,
            isLoading: false 
          });
        } catch (error) {
          set({ error: error as Error, isLoading: false });
        }
      },
      signOut: async () => {
        try {
          set({ isLoading: true, error: null });
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          set({ user: null, session: null, isLoading: false });
        } catch (error) {
          set({ error: error as Error, isLoading: false });
        }
      },
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user, session: state.session }),
    }
  )
);