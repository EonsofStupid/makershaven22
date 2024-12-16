import { create } from 'zustand';
import type { AuthUser, AuthSession } from '@/lib/types/auth/base';

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
  setLoading: (isLoading: boolean) => void;
  setTransitioning: (isTransitioning: boolean) => void;
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
      // Implement sign in logic
      set({ isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      // Implement sign out logic
      set({ user: null, session: null, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
  setTransitioning: (isTransitioning) => set({ isTransitioning })
}));