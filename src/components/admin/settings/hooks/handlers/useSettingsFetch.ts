
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Settings, SecuritySettings } from "@/lib/types/settings/core";
import { ThemeMode } from "@/lib/types/core/enums";
import { Json, isJsonObject, safeJsonParse } from "@/lib/types/core/json";

export const useSettingsFetch = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async (): Promise<Settings> => {
      console.log("Fetching site settings...");
      
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load site settings");
        throw error;
      }

      // Transform the data to match Settings type
      const settings: Settings = {
        site_title: data.site_title,
        tagline: data.tagline,
        primary_color: data.primary_color,
        secondary_color: data.secondary_color,
        accent_color: data.accent_color,
        logo_url: data.logo_url,
        favicon_url: data.favicon_url,
        theme_mode: data.theme_mode as ThemeMode,
        text_primary_color: data.text_primary_color,
        text_secondary_color: data.text_secondary_color,
        text_link_color: data.text_link_color,
        text_heading_color: data.text_heading_color,
        neon_cyan: data.neon_cyan || '#41f0db',
        neon_pink: data.neon_pink || '#ff0abe',
        neon_purple: data.neon_purple || '#8000ff',
        border_radius: data.border_radius,
        spacing_unit: data.spacing_unit,
        transition_duration: data.transition_duration,
        shadow_color: data.shadow_color,
        hover_scale: data.hover_scale,
        font_family_heading: data.font_family_heading,
        font_family_body: data.font_family_body,
        font_size_base: data.font_size_base,
        font_weight_normal: data.font_weight_normal,
        font_weight_bold: data.font_weight_bold,
        line_height_base: data.line_height_base,
        letter_spacing: data.letter_spacing,
        transition_type: (data.transition_type as 'fade' | 'slide' | 'scale') || 'fade',
        box_shadow: data.box_shadow || 'none',
        backdrop_blur: data.backdrop_blur || '0',
        updated_at: data.updated_at,
        updated_by: data.updated_by
      };

      // Handle security settings
      if (data.security_settings) {
        try {
          // Parse security settings properly
          let securityData: SecuritySettings;
          
          if (typeof data.security_settings === 'string') {
            securityData = safeJsonParse(data.security_settings, {
              enable_ip_filtering: false,
              two_factor_auth: false,
              max_login_attempts: 5
            });
          } else if (isJsonObject(data.security_settings)) {
            securityData = data.security_settings as SecuritySettings;
          } else {
            securityData = {
              enable_ip_filtering: false,
              two_factor_auth: false,
              max_login_attempts: 5
            };
          }
          
          // Ensure required fields exist
          settings.security_settings = {
            enable_ip_filtering: securityData.enable_ip_filtering ?? false,
            two_factor_auth: securityData.two_factor_auth ?? false,
            max_login_attempts: securityData.max_login_attempts ?? 5,
            ip_whitelist: Array.isArray(securityData.ip_whitelist) ? securityData.ip_whitelist : [],
            ip_blacklist: Array.isArray(securityData.ip_blacklist) ? securityData.ip_blacklist : [],
            session_timeout_minutes: securityData.session_timeout_minutes,
            lockout_duration_minutes: securityData.lockout_duration_minutes,
            rate_limit_requests: securityData.rate_limit_requests,
            rate_limit_window_minutes: securityData.rate_limit_window_minutes
          };
        } catch (err) {
          console.error("Error parsing security settings:", err);
          // Provide default security settings if parsing fails
          settings.security_settings = {
            enable_ip_filtering: false,
            two_factor_auth: false,
            max_login_attempts: 5,
            ip_whitelist: [],
            ip_blacklist: []
          };
        }
      }

      console.log("Settings fetched successfully:", settings);
      return settings;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
