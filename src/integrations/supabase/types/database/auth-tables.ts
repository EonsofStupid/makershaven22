import { Json } from './base';
import type { UserRole } from '../enums';

export interface AuthTables {
  profiles: {
    Row: {
      id: string;
      username: string | null;
      display_name: string | null;
      avatar_url: string | null;
      role: UserRole | null;
      bio: string | null;
      website: string | null;
      location: string | null;
      created_at: string;
      updated_at: string;
      last_seen: string | null;
      is_banned: boolean | null;
      ban_reason: string | null;
      banned_at: string | null;
      banned_by: string | null;
      two_factor_enabled: boolean | null;
      two_factor_secret: string | null;
      onboarding_completed: boolean | null;
      gamification_enabled: boolean | null;
      visual_editor_enabled: boolean | null;
      last_login_at: string | null;
    };
    Insert: Partial<AuthTables['profiles']['Row']>;
    Update: Partial<AuthTables['profiles']['Row']>;
  };
  
  security_logs: {
    Row: {
      id: string;
      user_id: string | null;
      event_type: string;
      severity: string;
      details: Json | null;
      ip_address: string | null;
      user_agent: string | null;
      created_at: string | null;
    };
    Insert: Partial<AuthTables['security_logs']['Row']>;
    Update: Partial<AuthTables['security_logs']['Row']>;
  };
}