import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  session: any | null;
  user: any | null;
  isLoading: boolean;
  error: string | null;
  setSession: (session: any | null) => void;
  setUser: (user: any | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      isLoading: false,
      error: null,
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      signOut: async () => {
        try {
          await supabase.auth.signOut();
          set({ session: null, user: null });
        } catch (error: any) {
          set({ error: error.message });
        }
      },
    }),
    { name: 'auth-store' }
  )
);