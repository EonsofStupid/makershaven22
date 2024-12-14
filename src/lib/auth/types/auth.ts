import type { Json } from '@/integrations/supabase/types';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'guest';
export type SecurityEventSeverity = 'low' | 'medium' | 'high';
export type SecurityEventCategory = 'auth' | 'session' | 'security' | 'pin' | 'audit';

export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  lastSeen?: Date;
  isBanned?: boolean;
  banReason?: string;
  bannedAt?: Date;
  bannedBy?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

export interface SessionConfig {
  refreshInterval: number;
  sessionTimeout: number;
  storageKey: string;
  onSessionExpired?: () => void;
  onRefreshError?: (error: Error) => void;
}

export interface SessionState {
  isAuthenticated: boolean;
  lastActivity: Date;
  token?: string;
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
}

export interface SecurityLog {
  id: string;
  userId: string;
  eventType: string;
  severity: SecurityEventSeverity;
  category: SecurityEventCategory;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface AuthState {
  isLoading: boolean;
  hasAccess: boolean;
  error: Error | null;
  isTransitioning: boolean;
  reset: () => void;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}