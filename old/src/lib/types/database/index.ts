
import { SiteSettingsTable, SecuritySettingsTable, AdminSettingsTable } from './tables/settings';

/**
 * Database schema type definition for Supabase
 */
export interface Database {
  public: {
    Tables: {
      site_settings: SiteSettingsTable;
      security_settings: SecuritySettingsTable;
      admin_settings: AdminSettingsTable;
      // Add other tables as needed
    };
    Views: Record<string, never>;
    Functions: {
      update_site_settings: {
        Args: {
          p_site_title: string;
          p_tagline: string;
          p_primary_color: string;
          p_secondary_color: string;
          p_accent_color: string;
          p_text_primary_color: string;
          p_text_secondary_color: string;
          p_text_link_color: string;
          p_text_heading_color: string;
          p_neon_cyan: string;
          p_neon_pink: string;
          p_neon_purple: string;
          p_border_radius: string;
          p_spacing_unit: string;
          p_transition_duration: string;
          p_shadow_color: string;
          p_hover_scale: string;
          p_font_family_heading: string;
          p_font_family_body: string;
          p_font_size_base: string;
          p_font_weight_normal: string;
          p_font_weight_bold: string;
          p_line_height_base: string;
          p_letter_spacing: string;
        };
        Returns: any;
      };
      // Add other functions as needed
    };
  };
};

export type Tables = Database["public"]["Tables"];
export type TableNames = keyof Tables;
