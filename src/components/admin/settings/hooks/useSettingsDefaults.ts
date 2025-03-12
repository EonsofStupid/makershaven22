
import { Settings } from "@/lib/types/settings/core";

// Ensure this aligns with the Settings interface
export const DEFAULT_SETTINGS: Settings = {
  site_title: "MakersImpulse",
  tagline: "Create, Share, Inspire",
  primary_color: "#7FFFD4",
  secondary_color: "#FFB6C1",
  accent_color: "#E6E6FA",
  text_primary_color: "#FFFFFF",
  text_secondary_color: "#A1A1AA",
  text_link_color: "#3B82F6",
  text_heading_color: "#FFFFFF",
  neon_cyan: "#41f0db",
  neon_pink: "#ff0abe",
  neon_purple: "#8000ff",
  border_radius: "0.5rem",
  spacing_unit: "1rem",
  transition_duration: "0.3s",
  shadow_color: "#000000",
  hover_scale: "1.05",
  font_family_heading: "Inter",
  font_family_body: "Inter",
  font_size_base: "16px",
  font_weight_normal: "400",
  font_weight_bold: "700",
  line_height_base: "1.5",
  letter_spacing: "normal",
  box_shadow: "none",
  backdrop_blur: "0",
  transition_type: "fade" as const,
  menu_animation_type: "fade" as const,
  security_settings: {
    enable_ip_filtering: false,
    two_factor_auth: false,
    max_login_attempts: 5,
    ip_whitelist: [],
    ip_blacklist: []
  }
};
