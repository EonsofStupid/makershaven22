export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string;
          site_title: string;
          tagline: string | null;
          description: string | null;
          keywords: string[] | null;
          logo_url: string | null;
          favicon_url: string | null;
          primary_domain: string | null;
          support_email: string | null;
          contact_email: string | null;
          social_links: Json | null;
          analytics_id: string | null;
          custom_scripts: string[] | null;
          maintenance_mode: boolean | null;
          maintenance_message: string | null;
          theme_mode: string | null;
          primary_color: string | null;
          secondary_color: string | null;
          accent_color: string | null;
          text_primary_color: string | null;
          text_secondary_color: string | null;
          text_link_color: string | null;
          text_heading_color: string | null;
          neon_cyan: string | null;
          neon_pink: string | null;
          neon_purple: string | null;
          font_family_heading: string | null;
          font_family_body: string | null;
          font_size_base: string | null;
          font_weight_normal: string | null;
          font_weight_bold: string | null;
          line_height_base: string | null;
          letter_spacing: string | null;
          border_radius: string | null;
          spacing_unit: string | null;
          transition_duration: string | null;
          shadow_color: string | null;
          hover_scale: string | null;
          box_shadow: string | null;
          backdrop_blur: string | null;
          transition_type: string | null;
          menu_animation_type: string | null;
          glass_effect: string | null;
          custom_css: string | null;
          security_settings: Json | null;
          metadata: Json | null;
          theme_preferences: Json | null;
          theme_metadata: Json | null;
          created_at: string | null;
          updated_at: string | null;
          created_by: string | null;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          site_title?: string;
          tagline?: string | null;
          description?: string | null;
          keywords?: string[] | null;
          logo_url?: string | null;
          favicon_url?: string | null;
          primary_domain?: string | null;
          support_email?: string | null;
          contact_email?: string | null;
          social_links?: Json | null;
          analytics_id?: string | null;
          custom_scripts?: string[] | null;
          maintenance_mode?: boolean | null;
          maintenance_message?: string | null;
          theme_mode?: string | null;
          primary_color?: string | null;
          secondary_color?: string | null;
          accent_color?: string | null;
          text_primary_color?: string | null;
          text_secondary_color?: string | null;
          text_link_color?: string | null;
          text_heading_color?: string | null;
          neon_cyan?: string | null;
          neon_pink?: string | null;
          neon_purple?: string | null;
          font_family_heading?: string | null;
          font_family_body?: string | null;
          font_size_base?: string | null;
          font_weight_normal?: string | null;
          font_weight_bold?: string | null;
          line_height_base?: string | null;
          letter_spacing?: string | null;
          border_radius?: string | null;
          spacing_unit?: string | null;
          transition_duration?: string | null;
          shadow_color?: string | null;
          hover_scale?: string | null;
          box_shadow?: string | null;
          backdrop_blur?: string | null;
          transition_type?: string | null;
          menu_animation_type?: string | null;
          glass_effect?: string | null;
          custom_css?: string | null;
          security_settings?: Json | null;
          metadata?: Json | null;
          theme_preferences?: Json | null;
          theme_metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          site_title?: string;
          tagline?: string | null;
          description?: string | null;
          keywords?: string[] | null;
          logo_url?: string | null;
          favicon_url?: string | null;
          primary_domain?: string | null;
          support_email?: string | null;
          contact_email?: string | null;
          social_links?: Json | null;
          analytics_id?: string | null;
          custom_scripts?: string[] | null;
          maintenance_mode?: boolean | null;
          maintenance_message?: string | null;
          theme_mode?: string | null;
          primary_color?: string | null;
          secondary_color?: string | null;
          accent_color?: string | null;
          text_primary_color?: string | null;
          text_secondary_color?: string | null;
          text_link_color?: string | null;
          text_heading_color?: string | null;
          neon_cyan?: string | null;
          neon_pink?: string | null;
          neon_purple?: string | null;
          font_family_heading?: string | null;
          font_family_body?: string | null;
          font_size_base?: string | null;
          font_weight_normal?: string | null;
          font_weight_bold?: string | null;
          line_height_base?: string | null;
          letter_spacing?: string | null;
          border_radius?: string | null;
          spacing_unit?: string | null;
          transition_duration?: string | null;
          shadow_color?: string | null;
          hover_scale?: string | null;
          box_shadow?: string | null;
          backdrop_blur?: string | null;
          transition_type?: string | null;
          menu_animation_type?: string | null;
          glass_effect?: string | null;
          custom_css?: string | null;
          security_settings?: Json | null;
          metadata?: Json | null;
          theme_preferences?: Json | null;
          theme_metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "site_settings_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "site_settings_updated_by_fkey";
            columns: ["updated_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
    CompositeTypes: {
      [_ in never]: never
    };
  };
}
