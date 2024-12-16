import { create } from 'zustand';
import type { AuthUser, AuthSession, AuthState } from '@/lib/types/auth/base';
import { supabase } from '@/integrations/supabase/client';

interface AuthStore extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setError: (error: Error | null) => void;
  setLoading: (isLoading: boolean) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  setHasAccess: (hasAccess: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  isTransitioning: false,
  hasAccess: false,

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ 
        user: data.user as AuthUser,
        session: data.session as AuthSession,
        isLoading: false,
        hasAccess: true 
      });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await supabase.auth.signOut();
      set({ 
        user: null, 
        session: null, 
        isLoading: false,
        hasAccess: false 
      });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
  setTransitioning: (isTransitioning) => set({ isTransitioning }),
  setHasAccess: (hasAccess) => set({ hasAccess }),
  reset: () => set({
    user: null,
    session: null,
    isLoading: false,
    error: null,
    isTransitioning: false,
    hasAccess: false
  })
}));