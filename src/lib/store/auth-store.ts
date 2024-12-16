import { create } from 'zustand';
import type { AuthState, AuthUser, AuthSession } from '@/lib/types/auth/base';

interface AuthStore extends AuthState {
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  setHasAccess: (hasAccess: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  error: null,
  isTransitioning: false,
  hasAccess: false,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setTransitioning: (isTransitioning) => set({ isTransitioning }),
  setHasAccess: (hasAccess) => set({ hasAccess }),

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Implement actual sign in logic with Supabase
      set({ isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  signOut: async () => {
    set({ user: null, session: null });
  },

  reset: () => set({
    user: null,
    session: null,
    isLoading: false,
    error: null,
    isTransitioning: false,
    hasAccess: false
  })
}));