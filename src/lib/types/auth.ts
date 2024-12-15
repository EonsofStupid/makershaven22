import { BaseEntity } from './base';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser extends BaseEntity {
  email?: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
}

export interface SecurityLog extends BaseEntity {
  user_id: string;
  event_type: string;
  severity: 'low' | 'medium' | 'high';
  details: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}