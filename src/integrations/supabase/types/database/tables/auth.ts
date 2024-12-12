import type { Database } from "../../database";
import type { UserRole } from "../enums/user";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type TrustedDevice = Database["public"]["Tables"]["trusted_devices"]["Row"];
export type Active2FASession = Database["public"]["Tables"]["active_2fa_sessions"]["Row"];
export type RecoveryCode = Database["public"]["Tables"]["recovery_codes"]["Row"];
export type PinAuthLog = Database["public"]["Tables"]["pin_auth_logs"]["Row"];

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
      pin_hash: string | null;
      last_password_login: string | null;
      failed_pin_attempts: number | null;
      lockout_until: string | null;
      pin_enabled: boolean | null;
      failed_login_attempts: number | null;
    };
    Insert: Partial<AuthTableDefinitions["profiles"]["Row"]>;
    Update: Partial<AuthTableDefinitions["profiles"]["Row"]>;
  };
  trusted_devices: {
    Row: {
      id: string;
      user_id: string | null;
      device_hash: string;
      device_name: string;
      last_used: string | null;
      expires_at: string;
      created_at: string | null;
    };
    Insert: Partial<AuthTableDefinitions["trusted_devices"]["Row"]>;
    Update: Partial<AuthTableDefinitions["trusted_devices"]["Row"]>;
  };
  active_2fa_sessions: {
    Row: {
      id: string;
      user_id: string | null;
      device_name: string;
      ip_address: string | null;
      user_agent: string | null;
      is_active: boolean | null;
      last_activity: string | null;
      created_at: string | null;
    };
    Insert: Partial<AuthTableDefinitions["active_2fa_sessions"]["Row"]>;
    Update: Partial<AuthTableDefinitions["active_2fa_sessions"]["Row"]>;
  };
}