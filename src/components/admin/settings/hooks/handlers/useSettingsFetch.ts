
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Settings } from "@/lib/types/settings/core";
import { SecuritySettings } from "@/lib/types/settings/security";
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
        site_title: data.site_title || 'MakersImpulse',
        tagline: data.tagline,
        primary_color: data.primary_color || '#7FFFD4',
        secondary_color: data.secondary_color || '#FFB6C1',
        accent_color: data.accent_color || '#E6E6FA',
        logo_url: data.logo_url,
        favicon_url: data.favicon_url,
        text_primary_color: data.text_primary_color || '#FFFFFF',
        text_secondary_color: data.text_secondary_color || '#A1A1AA',
        text_link_color: data.text_link_color || '#3B82F6',
        text_heading_color: data.text_heading_color || '#FFFFFF',
        neon_cyan: data.neon_cyan || '#41f0db',
        neon_pink: data.neon_pink || '#ff0abe',
        neon_purple: data.neon_purple || '#8000ff',
        border_radius: data.border_radius || '0.5rem',
        spacing_unit: data.spacing_unit || '1rem',
        transition_duration: data.transition_duration || '0.3s',
        shadow_color: data.shadow_color || '#000000',
        hover_scale: data.hover_scale || '1.05',
        font_family_heading: data.font_family_heading || 'Inter',
        font_family_body: data.font_family_body || 'Inter',
        font_size_base: data.font_size_base || '16px',
        font_weight_normal: data.font_weight_normal || '400',
        font_weight_bold: data.font_weight_bold || '700',
        line_height_base: data.line_height_base || '1.5',
        letter_spacing: data.letter_spacing || 'normal',
        transition_type: (data.transition_type as 'fade' | 'slide' | 'scale') || 'fade',
        box_shadow: data.box_shadow || 'none',
        backdrop_blur: data.backdrop_blur || '0',
        updated_at: data.updated_at,
        updated_by: data.updated_by,
        theme_mode: data.theme_mode,
        security_settings: {
          enable_ip_filtering: false,
          two_factor_auth: false,
          max_login_attempts: 5,
          ip_whitelist: [],
          ip_blacklist: []
        }
      };

      // Handle security settings
      if (data.security_settings) {
        try {
          // Parse security settings properly based on what type they are
          let securityData: SecuritySettings;
          
          if (typeof data.security_settings === 'string') {
            securityData = safeJsonParse(data.security_settings, {
              enable_ip_filtering: false,
              two_factor_auth: false,
              max_login_attempts: 5
            });
          } else if (isJsonObject(data.security_settings)) {
            // Need to create a proper SecuritySettings object from the JSON object
            const secJson = data.security_settings as Record<string, Json>;
            securityData = {
              enable_ip_filtering: secJson.enable_ip_filtering === true,
              two_factor_auth: secJson.two_factor_auth === true,
              max_login_attempts: typeof secJson.max_login_attempts === 'number' ? secJson.max_login_attempts : 5,
              ip_whitelist: Array.isArray(secJson.ip_whitelist) ? secJson.ip_whitelist.map(ip => String(ip)) : [],
              ip_blacklist: Array.isArray(secJson.ip_blacklist) ? secJson.ip_blacklist.map(ip => String(ip)) : [],
              session_timeout_minutes: typeof secJson.session_timeout_minutes === 'number' ? secJson.session_timeout_minutes : undefined,
              lockout_duration_minutes: typeof secJson.lockout_duration_minutes === 'number' ? secJson.lockout_duration_minutes : undefined,
              rate_limit_requests: typeof secJson.rate_limit_requests === 'number' ? secJson.rate_limit_requests : undefined,
              rate_limit_window_minutes: typeof secJson.rate_limit_window_minutes === 'number' ? secJson.rate_limit_window_minutes : undefined
            };
          } else {
            securityData = {
              enable_ip_filtering: false,
              two_factor_auth: false,
              max_login_attempts: 5
            };
          }
          
          settings.security_settings = securityData;
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
