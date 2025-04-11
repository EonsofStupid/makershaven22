
import { UserRole } from "@/lib/types/core/enums";

export interface AuthUser {
  id: string;
  email?: string | null;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

export interface AuthSession {
  id: string;
  user: AuthUser;
  expires_at?: number;
  created_at: string;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  isTransitioning: boolean;
  hasAccess: boolean;
  error: Error | { message: string } | null;
}
