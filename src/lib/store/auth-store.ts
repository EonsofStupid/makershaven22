import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthUser {
  id: string;
  email?: string | null;
  role?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

interface AuthState {
  session: any | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  setSession: (session: any | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isTransitioning: false,
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
  signOut: async () => {
    try {
      set({ isTransitioning: true });
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      
      set({ session: null, user: null });
      toast.success("Successfully signed out");
    } catch (err) {
      console.error("Sign out error:", err);
      set({ error: err instanceof Error ? err : new Error('Failed to sign out') });
      toast.error("Failed to sign out");
    } finally {
      set({ isTransitioning: false });
    }
  },
  reset: () => set({
    session: null,
    user: null,
    error: null,
    isLoading: false,
    isTransitioning: false
  })
}));