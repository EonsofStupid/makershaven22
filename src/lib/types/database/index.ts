import { Json } from './core/json';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          display_name: string | null;
          avatar_url: string | null;
          role: 'subscriber' | 'maker' | 'admin' | 'super_admin' | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          role?: 'subscriber' | 'maker' | 'admin' | 'super_admin' | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          role?: 'subscriber' | 'maker' | 'admin' | 'super_admin' | null;
          updated_at?: string | null;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          author_id: string;
          created_at: string;
          updated_at: string | null;
          status: 'draft' | 'published' | 'archived';
          images: string[] | null;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          author_id: string;
          created_at?: string;
          updated_at?: string | null;
          status?: 'draft' | 'published' | 'archived';
          images?: string[] | null;
        };
        Update: {
          title?: string;
          content?: string;
          updated_at?: string | null;
          status?: 'draft' | 'published' | 'archived';
          images?: string[] | null;
        };
      };
      site_settings: {
        Row: {
          id: string;
          settings: Json;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          settings: Json;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          settings?: Json;
          updated_at?: string | null;
        };
      };
    };
    Functions: {
      update_site_settings: {
        Args: Record<string, unknown>;
        Returns: Json;
      };
    };
    Enums: {
      user_role: 'subscriber' | 'maker' | 'admin' | 'super_admin';
      post_status: 'draft' | 'published' | 'archived';
      post_category: 'Guides' | 'Reviews' | 'Blog' | 'Site Updates' | 'Critical' | '3D Printer' | '3D Printer Hardware';
    };
  };
}

export type Tables = Database['public']['Tables'];
export type Functions = Database['public']['Functions'];
export type Enums = Database['public']['Enums'];