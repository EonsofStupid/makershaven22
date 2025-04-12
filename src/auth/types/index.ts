
import { User } from '@supabase/supabase-js';
import { UserRole } from '../../shared/types/enums';

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  initialized: boolean;
  error: Error | null;
  isTransitioning: boolean; // Add missing property
  hasAccess: boolean; // Add missing property
}

export interface AuthUser extends User {
  role?: UserRole;
  displayName?: string;
  avatarUrl?: string;
  preferences?: Record<string, any>;
}

export interface AuthContextValue {
  state: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (profile: Partial<AuthUser>) => Promise<void>;
  hasRole: (requiredRole: UserRole | UserRole[]) => boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
