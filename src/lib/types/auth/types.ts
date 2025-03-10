
// Basic auth session type
export interface AuthSession {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone?: string;
    confirmed_at?: string;
    last_sign_in_at?: string;
    app_metadata: {
      provider?: string;
      [key: string]: any;
    };
    user_metadata: {
      [key: string]: any;
    };
    identities?: any[];
    created_at: string;
    updated_at: string;
  };
}

// User roles
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

// Auth user with role information
export interface AuthUser {
  id: string;
  email: string;
  role?: UserRole;
  app_metadata?: {
    provider?: string;
    [key: string]: any;
  };
  user_metadata?: {
    [key: string]: any;
  };
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

// Authentication error interface
export interface AuthError {
  message: string;
  status?: number;
  name?: string;
  type: string;
  code?: string;
}

// Auth state for store
export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  isTransitioning: boolean;
  error: AuthError | null;
  [key: string]: any;
}

// Error recovery state
export interface AuthErrorRecoveryState {
  isRecovering: boolean;
  error: AuthError | null;
  attempts: number;
  maxAttempts: number;
  lastAttempt: Date | null;
  nextAttemptDelay: number;
}
