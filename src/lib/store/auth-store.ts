import { create } from 'zustand';
import type { AuthUser, AuthSession } from '@/lib/types/auth';

interface AuthStore {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setError: (error: Error | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  error: null,
  signIn: async (email, password) => {
    set({ isLoading: true });
    // Implementation will be handled by auth provider
  },
  signOut: async () => {
    set({ isLoading: true });
    // Implementation will be handled by auth provider
  },
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setError: (error) => set({ error })
}));