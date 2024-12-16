import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { AuthState } from '@/lib/types/store-types';

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isTransitioning: false,
  hasAccess: false,
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
  reset: () => set({ 
    session: null, 
    user: null, 
    error: null, 
    isLoading: false, 
    isTransitioning: false,
    hasAccess: false 
  }),
  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ 
        session: null, 
        user: null,
        hasAccess: false 
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}));