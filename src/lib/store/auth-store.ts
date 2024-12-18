import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { AuthState, AuthUser, AuthSession, StoreError } from '@/lib/types/store-types';
import { toast } from 'sonner';

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isLoading: true,
  isTransitioning: false,
  error: null,
  isOffline: false,
  initialSetupDone: false,

  initialize: async () => {
    try {
      set({ isLoading: true });
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        set({ 
          session: session as AuthSession,
          user: session.user as AuthUser,
          initialSetupDone: true
        });
      }
    } catch (error) {
      set({ error: error as StoreError });
      toast.error('Failed to initialize auth');
    } finally {
      set({ isLoading: false });
    }
  },

  handleSessionUpdate: async (session) => {
    try {
      set({ isTransitioning: true });
      if (session) {
        set({
          session: session as AuthSession,
          user: session.user as AuthUser,
          error: null
        });
      } else {
        set({
          session: null,
          user: null
        });
      }
    } catch (error) {
      set({ error: error as StoreError });
      toast.error('Session update failed');
    } finally {
      set({ isTransitioning: false });
    }
  },

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setOffline: (isOffline) => set({ isOffline }),

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({
        session: null,
        user: null,
        error: null
      });
      toast.success('Signed out successfully');
    } catch (error) {
      set({ error: error as StoreError });
      toast.error('Sign out failed');
    }
  },

  reset: () => set({
    session: null,
    user: null,
    isLoading: false,
    isTransitioning: false,
    error: null,
    isOffline: false
  })
}));