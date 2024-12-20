
// Shared Types Derived from Database Schema

export type ThemeComponentType = "color" | "typography" | "layout" | "animation" | "effect";
export type TransitionType = "fade" | "slide" | "scale" | "blur";
export type ContentStatus = "draft" | "published" | "archived";
export type ContentType = "page" | "component" | "template" | "workflow";

export interface SiteSettings {
  id: string;
  site_title: string;
  tagline: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  text_primary_color: string | null;
  text_secondary_color: string | null;
  text_link_color: string | null;
  font_family_heading: string;
  font_family_body: string;
  theme_mode: "light" | "dark" | "system";
}

export interface CmsContent {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  created_at: string;
}
