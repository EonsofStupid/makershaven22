import { create } from 'zustand';
import type { AuthUser, AuthSession, AuthState } from '@/lib/types/auth';

interface AuthStore extends AuthState {
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
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
  reset: () => set({
    user: null,
    session: null,
    isLoading: false,
    error: null,
    isTransitioning: false,
    hasAccess: false
  })
}));