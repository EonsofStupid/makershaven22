export interface AuthStore {
  session: any | null;
  user: any | null;
  isLoading: boolean;
  isTransitioning: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: any) => Promise<void>;
  setSession: (session: any | null) => void;
  setUser: (user: any | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  signOut: () => Promise<void>;
}

export interface AuthUser {
  id: string;
  email?: string;
  role?: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: AuthUser;
}

export interface SessionConfig {
  timeoutMinutes: number;
  maxAttempts: number;
  lockoutMinutes: number;
}

export interface SessionState {
  session: any | null;
  setSession: (session: any | null) => void;
  clearSession: () => void;
}