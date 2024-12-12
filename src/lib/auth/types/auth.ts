import type { Session } from '@supabase/supabase-js';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export type SecurityEventSeverity = 'low' | 'medium' | 'high';
export type SecurityEventCategory = 'auth' | 'session' | 'security' | 'pin' | 'audit';

export interface AuthUser {
  id: string;
  email?: string | null;
  role?: UserRole;
  username?: string;
  displayName?: string;
  lastSeen?: Date;
  isBanned?: boolean;
  banReason?: string;
  bannedAt?: Date;
  bannedBy?: string;
}

export interface AuthSession {
  id: string;
  user: AuthUser;
  deviceId: string;
  expiresAt: Date;
  lastActivity: Date;
  ipAddress?: string;
  userAgent?: string;
  isValid: boolean;
  metadata?: Record<string, any>;
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
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  isTransitioning: boolean;
}