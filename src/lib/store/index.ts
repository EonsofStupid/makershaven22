import { create } from 'zustand';
import type { GlobalState, Settings, AuthUser, AuthSession } from '../types';

export const useStore = create<GlobalState>((set) => ({
  // Initial state
  settings: null,
  user: null,
  session: null,
  isLoading: false,
  error: null,

  // Actions
  setSettings: (settings: Settings | null) => set({ settings }),
  setUser: (user: AuthUser | null) => set({ user }),
  setSession: (session: AuthSession | null) => set({ session }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: Error | null) => set({ error }),
  reset: () => set({ settings: null, user: null, session: null, isLoading: false, error: null })
}));