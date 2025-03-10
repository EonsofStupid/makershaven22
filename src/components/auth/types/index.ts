
import { UserRole as CoreUserRole } from '@/lib/types/core/enums';
import { Session } from '@supabase/supabase-js';

export interface AuthState {
  session: Session | null;
  user: UserProfile | null;
  isLoading: boolean;
  isTransitioning: boolean;
  hasAccess: boolean;
  error: AuthError | null;
}

export interface UserProfile {
  id: string;
  email?: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  role?: UserRole;
  is_banned?: boolean;
  last_seen?: string;
}

// Extend the core UserRole type to include 'moderator'
export type UserRole = CoreUserRole | 'moderator';

export interface AuthError {
  message: string;
  type: 'auth' | 'permission' | 'network' | 'unknown';
  details?: Record<string, any>;
  recoverable?: boolean;
  retryAfter?: number;
}

export interface AuthErrorRecoveryState {
  attemptCount: number;
  recoveryAvailable: boolean;
  isRecovering: boolean;
  recoveryMethod?: 'retry' | 'refresh' | 'redirect';
  recoveryTarget?: string;
}
