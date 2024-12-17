import type { Json } from '../base/json';
import type { ThemeMode } from '../enums';

export interface SiteSettingsTable {
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
    theme_mode: ThemeMode | null;
    font_family_heading: string;
    font_family_body: string;
    font_size_base: string;
    font_weight_normal: string;
    font_weight_bold: string;
    line_height_base: string;
    letter_spacing: string;
    updated_at: string | null;
    updated_by: string | null;
  };
  Insert: Partial<SiteSettingsTable['Row']>;
  Update: Partial<SiteSettingsTable['Row']>;
}