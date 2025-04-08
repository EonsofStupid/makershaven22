
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          email: string | null;
          bio: string | null;
          location: string | null;
          website: string | null;
          role: 'admin' | 'moderator' | 'subscriber' | 'user';
          is_banned: boolean;
          created_at: string;
          updated_at: string;
          last_seen: string | null;
          onboarding_completed: boolean;
          gamification_enabled: boolean;
          two_factor_enabled: boolean;
        };
        Insert: {
          id: string;
          username?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          bio?: string | null;
          location?: string | null;
          website?: string | null;
          role?: 'admin' | 'moderator' | 'subscriber' | 'user';
          is_banned?: boolean;
          created_at?: string;
          updated_at?: string;
          last_seen?: string | null;
          onboarding_completed?: boolean;
          gamification_enabled?: boolean;
          two_factor_enabled?: boolean;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          bio?: string | null;
          location?: string | null;
          website?: string | null;
          role?: 'admin' | 'moderator' | 'subscriber' | 'user';
          is_banned?: boolean;
          created_at?: string;
          updated_at?: string;
          last_seen?: string | null;
          onboarding_completed?: boolean;
          gamification_enabled?: boolean;
          two_factor_enabled?: boolean;
        };
      };
      site_settings: {
        Row: {
          id: string;
          site_title: string;
          primary_color: string;
          secondary_color: string;
          accent_color: string;
          created_at: string;
          updated_at: string;
          security_settings: Json;
        };
        Insert: {
          id?: string;
          site_title?: string;
          primary_color?: string;
          secondary_color?: string;
          accent_color?: string;
          created_at?: string;
          updated_at?: string;
          security_settings?: Json;
        };
        Update: {
          id?: string;
          site_title?: string;
          primary_color?: string;
          secondary_color?: string;
          accent_color?: string;
          created_at?: string;
          updated_at?: string;
          security_settings?: Json;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'admin' | 'moderator' | 'subscriber' | 'user';
    };
  };
}
