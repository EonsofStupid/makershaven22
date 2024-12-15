import { StateCreator } from 'zustand';
import { AuthState } from '../types/store/auth';
import { GlobalState } from '../types';

export const createAuthSlice: StateCreator<
  GlobalState,
  [],
  [],
  AuthState
> = (set) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  isTransitioning: false,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setTransitioning: (isTransitioning) => set({ isTransitioning }),
  reset: () => set({
    user: null,
    session: null,
    isLoading: false,
    error: null,
    isTransitioning: false
  })
});