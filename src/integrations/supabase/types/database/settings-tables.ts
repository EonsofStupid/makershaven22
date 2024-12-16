import { Json } from './base';

export interface SettingsTables {
  site_settings: {
    Row: {
      id: string;
      site_title: string;
      tagline: string | null;
      primary_color: string | null;
      secondary_color: string | null;
      accent_color: string | null;
      text_primary_color: string | null;
      text_secondary_color: string | null;
      text_link_color: string | null;
      text_heading_color: string | null;
      font_family_heading: string;
      font_family_body: string;
      font_size_base: string;
      font_weight_normal: string;
      font_weight_bold: string;
      line_height_base: string;
      letter_spacing: string;
      border_radius: string | null;
      spacing_unit: string | null;
      shadow_color: string | null;
      hover_scale: string | null;
      transition_duration: string | null;
      logo_url: string | null;
      favicon_url: string | null;
      updated_at: string | null;
      updated_by: string | null;
      security_settings: Json | null;
    };
    Insert: Partial<SettingsTables['site_settings']['Row']>;
    Update: Partial<SettingsTables['site_settings']['Row']>;
  };
}