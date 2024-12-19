import { AuthSession, AuthUser } from "@/integrations/supabase/types/auth";

export interface StoreError {
  message: string;
  code?: string;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: StoreError | null;
  isOffline: boolean;
  isTransitioning: boolean;
  initialSetupDone: boolean;
  
  // Auth actions
  initialize: () => Promise<void>;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: StoreError | null) => void;
  setOffline: (isOffline: boolean) => void;
  handleSessionUpdate: (session: AuthSession | null) => void;
  signOut: () => Promise<void>;
  reset: () => void;
}