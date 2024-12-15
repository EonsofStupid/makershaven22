import type { Json } from '../base';
import type { UserRole } from './enums/user';

export interface AuthTableDefinitions {
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
    Insert: Partial<AuthTableDefinitions["profiles"]["Row"]>;
    Update: Partial<AuthTableDefinitions["profiles"]["Row"]>;
  };
}