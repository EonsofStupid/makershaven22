
// Re-export from auth types
export { 
  type AuthSession, 
  type AuthUser, 
  type AuthError,
  type UserRole,
  type AuthState, 
  type AuthErrorRecoveryState 
} from '@/lib/types/auth/types';

// Component specific types
export interface AuthProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
}

// Auth guard props
export interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole | UserRole[];
  fallbackPath?: string;
  loading?: React.ReactNode;
}
