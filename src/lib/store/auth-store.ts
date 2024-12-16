import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { AuthSession, AuthUser } from '@/lib/auth/types';

interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  isTransitioning: boolean;
}

interface AuthStore extends AuthState {
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
}

const initialState: AuthState = {
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isOffline: false,
  isTransitioning: false
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setOffline: (isOffline) => set({ isOffline }),
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set(initialState);
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
      set({ error: error instanceof Error ? error : new Error('Failed to sign out') });
    }
  },
  reset: () => set(initialState)
}));