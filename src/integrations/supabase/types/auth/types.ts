import type { UserRole } from './roles';

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

export type SecurityEventSeverity = 'low' | 'medium' | 'high';
export type SecurityEventCategory = 'auth' | 'session' | 'security' | 'pin' | 'audit';