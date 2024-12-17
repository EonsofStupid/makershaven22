import type { Session } from '@supabase/supabase-js';
import { Json } from '@/integrations/supabase/types';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
export type SecurityEventSeverity = 'low' | 'medium' | 'high';
export type SecurityEventCategory = 'auth' | 'session' | 'security' | 'pin' | 'audit';

export interface AuthUser {
  id: string;
  email?: string | null;
  role?: UserRole;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
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

export interface AuthSession {
  user: AuthUser;
  expires_at?: number;
  access_token?: string;
  refresh_token?: string;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  hasAccess: boolean;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  handleSessionUpdate: (session: AuthSession | null) => Promise<void>;
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