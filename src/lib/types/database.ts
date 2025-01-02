import { Json } from './core/base';

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string;
          site_title: string;
          tagline: string;
          primary_color: string;
          secondary_color: string;
          accent_color: string;
          text_primary_color: string;
          text_secondary_color: string;
          text_link_color: string;
          text_heading_color: string;
          neon_cyan: string;
          neon_pink: string;
          neon_purple: string;
          font_family_heading: string;
          font_family_body: string;
          font_size_base: string;
          font_weight_normal: string;
          font_weight_bold: string;
          line_height_base: string;
          letter_spacing: string;
          border_radius: string;
          spacing_unit: string;
          transition_duration: string;
          shadow_color: string;
          hover_scale: string;
          box_shadow: string | null;
          backdrop_blur: string | null;
          logo_url: string | null;
          favicon_url: string | null;
          security_settings: Json;
          theme_mode: 'light' | 'dark' | 'system';
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          [key: string]: any;
        };
        Update: {
          [key: string]: any;
        };
      };
      security_events: {
        Row: any;
      };
      security_audit_logs: {
        Row: any;
      };
      user_activity: {
        Row: any;
      };
      media: {
        Row: any;
      };
      blog_posts: {
        Row: any;
      };
      cms_content: {
        Row: any;
      };
      cms_components: {
        Row: any;
      };
      cms_categories: {
        Row: any;
      };
    };
    Views: {
      [key: string]: any;
    };
    Functions: {
      [key: string]: any;
    };
    Enums: {
      [key: string]: any;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];