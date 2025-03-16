
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '../types/core/enums';

interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

interface AuthSession {
  user: AuthUser;
  expires_at?: number;
}

interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setOffline: (isOffline: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          set({ session: null, user: null });
        } catch (error) {
          set({ error: error as Error });
        }
      }
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        session: state.session,
        user: state.user,
        isOffline: state.isOffline
      })
    }
  )
);
