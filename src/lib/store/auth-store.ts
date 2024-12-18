import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  session: any | null;
  user: any | null;
  isLoading: boolean;
  isTransitioning: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: any) => Promise<void>;
  setSession: (session: any | null) => void;
  setUser: (user: any | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      isLoading: true,
      isTransitioning: false,
      error: null,
      initialize: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            set({ session, user: session.user });
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to initialize auth' });
        } finally {
          set({ isLoading: false });
        }
      },
      handleSessionUpdate: async (session) => {
        set({ isTransitioning: true });
        try {
          if (session) {
            set({ session, user: session.user });
          } else {
            set({ session: null, user: null });
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Session update failed' });
        } finally {
          set({ isTransitioning: false });
        }
      },
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      signOut: async () => {
        try {
          await supabase.auth.signOut();
          set({ session: null, user: null });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Sign out failed' });
        }
      },
    }),
    { name: 'auth-store' }
  )
);