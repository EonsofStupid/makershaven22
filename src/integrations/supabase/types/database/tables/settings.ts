import type { BaseEntity } from '../core/base-types';
import type { Json } from '../core/json';
import type { ThemeMode } from '../core/enums';

export interface SiteSettings extends BaseEntity {
  site_title: string;
  tagline?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_primary_color?: string;
  text_secondary_color?: string;
  text_link_color?: string;
  text_heading_color?: string;
  theme_mode?: ThemeMode;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  security_settings?: Json;
}