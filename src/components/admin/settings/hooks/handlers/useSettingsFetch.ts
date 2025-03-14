
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Settings } from "../../types";
import { ThemeMode } from "@/lib/types/core/enums";
import { SecuritySettings } from "@/lib/types/security/types";

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

      // Make sure theme_mode is a valid ThemeMode value
      const themeModeValue = data.theme_mode || 'system';
      const validThemeMode: ThemeMode = 
        (themeModeValue === 'light' || themeModeValue === 'dark' || themeModeValue === 'system') 
          ? themeModeValue as ThemeMode 
          : 'system';

      // Create default security settings if none exist
      const defaultSecuritySettings: SecuritySettings = {
        enable_ip_filtering: false,
        two_factor_auth: false,
        max_login_attempts: 5
      };

      // Parse security_settings or use default
      let securitySettings: SecuritySettings;
      if (data.security_settings && typeof data.security_settings === 'object') {
        securitySettings = {
          enable_ip_filtering: data.security_settings.enable_ip_filtering ?? defaultSecuritySettings.enable_ip_filtering,
          two_factor_auth: data.security_settings.two_factor_auth ?? defaultSecuritySettings.two_factor_auth,
          max_login_attempts: data.security_settings.max_login_attempts ?? defaultSecuritySettings.max_login_attempts,
          ip_blacklist: Array.isArray(data.security_settings.ip_blacklist) ? data.security_settings.ip_blacklist : undefined,
          ip_whitelist: Array.isArray(data.security_settings.ip_whitelist) ? data.security_settings.ip_whitelist : undefined,
          rate_limit_requests: typeof data.security_settings.rate_limit_requests === 'number' ? data.security_settings.rate_limit_requests : undefined,
          session_timeout_minutes: typeof data.security_settings.session_timeout_minutes === 'number' ? data.security_settings.session_timeout_minutes : undefined,
          lockout_duration_minutes: typeof data.security_settings.lockout_duration_minutes === 'number' ? data.security_settings.lockout_duration_minutes : undefined,
          rate_limit_window_minutes: typeof data.security_settings.rate_limit_window_minutes === 'number' ? data.security_settings.rate_limit_window_minutes : undefined
        };
      } else {
        securitySettings = defaultSecuritySettings;
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
        theme_mode: validThemeMode,
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
        security_settings: securitySettings,
        updated_at: data.updated_at,
        updated_by: data.updated_by
      };

      console.log("Settings fetched successfully:", settings);
      return settings;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
