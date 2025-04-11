
import { UserRole } from '@/lib/types/enums';

export type AuthSession = {
  user: AuthUser;
  expires_at?: number;
};

export type AuthUser = {
  id: string;
  email?: string | null;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
};

export type AuthState = {
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | { message: string } | null;
  isTransitioning?: boolean;
};

export type AuthError = {
  type: string;
  code?: string;
  message: string;
  stack?: string;
};

export type AuthErrorRecoveryState = {
  attemptCount: number;
  lastAttempt?: Date;
  nextAttemptDelay: number;
};

// Re-export the UserRole type to maintain backward compatibility
export type { UserRole };
