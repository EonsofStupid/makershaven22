import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { AuthSession, AuthUser } from '@/lib/auth/types';

interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isOffline: false,
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setOffline: (isOffline) => set({ isOffline }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
  reset: () => set({ session: null, user: null, isLoading: false, error: null, isOffline: false })
}));