
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Settings } from "../../types";
import { ThemeMode } from "@/lib/types/core/enums";
import { SecuritySettings } from "@/lib/types/security/types";
import { isJsonObject, safeRecord } from "@/lib/utils/type-utils";

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
      
      // Safely parse security_settings with proper type checking
      if (data.security_settings && isJsonObject(data.security_settings)) {
        const secObj = data.security_settings as Record<string, any>;
        
        securitySettings = {
          enable_ip_filtering: typeof secObj.enable_ip_filtering === 'boolean' ? secObj.enable_ip_filtering : defaultSecuritySettings.enable_ip_filtering,
          two_factor_auth: typeof secObj.two_factor_auth === 'boolean' ? secObj.two_factor_auth : defaultSecuritySettings.two_factor_auth,
          max_login_attempts: typeof secObj.max_login_attempts === 'number' ? secObj.max_login_attempts : defaultSecuritySettings.max_login_attempts,
          
          // Optional properties - only add if they exist in the data
          ...(Array.isArray(secObj.ip_blacklist) && { ip_blacklist: secObj.ip_blacklist.filter((ip: any) => typeof ip === 'string') }),
          ...(Array.isArray(secObj.ip_whitelist) && { ip_whitelist: secObj.ip_whitelist.filter((ip: any) => typeof ip === 'string') }),
          ...(typeof secObj.rate_limit_requests === 'number' && { rate_limit_requests: secObj.rate_limit_requests }),
          ...(typeof secObj.session_timeout_minutes === 'number' && { session_timeout_minutes: secObj.session_timeout_minutes }),
          ...(typeof secObj.lockout_duration_minutes === 'number' && { lockout_duration_minutes: secObj.lockout_duration_minutes }),
          ...(typeof secObj.rate_limit_window_minutes === 'number' && { rate_limit_window_minutes: secObj.rate_limit_window_minutes })
        };
      } else {
        securitySettings = defaultSecuritySettings;
      }

      // Safely convert metadata to Record<string, unknown>
      const metadata = safeRecord(data.metadata);

      // Transform the data to match Settings type
      const settings: Settings = {
        site_title: data.site_title || "MakersImpulse",
        tagline: data.tagline || "Create, Share, Inspire",
        primary_color: data.primary_color || "#7FFFD4",
        secondary_color: data.secondary_color || "#FFB6C1",
        accent_color: data.accent_color || "#E6E6FA",
        logo_url: data.logo_url,
        favicon_url: data.favicon_url,
        theme_mode: validThemeMode,
        text_primary_color: data.text_primary_color || "#FFFFFF",
        text_secondary_color: data.text_secondary_color || "#A1A1AA",
        text_link_color: data.text_link_color || "#3B82F6",
        text_heading_color: data.text_heading_color || "#FFFFFF",
        neon_cyan: data.neon_cyan || '#41f0db',
        neon_pink: data.neon_pink || '#ff0abe',
        neon_purple: data.neon_purple || '#8000ff',
        border_radius: data.border_radius || "0.5rem",
        spacing_unit: data.spacing_unit || "1rem",
        transition_duration: data.transition_duration || "0.3s",
        shadow_color: data.shadow_color || "#000000",
        hover_scale: data.hover_scale || "1.05",
        font_family_heading: data.font_family_heading || "Inter",
        font_family_body: data.font_family_body || "Inter",
        font_size_base: data.font_size_base || "16px",
        font_weight_normal: data.font_weight_normal || "400",
        font_weight_bold: data.font_weight_bold || "700",
        line_height_base: data.line_height_base || "1.5",
        letter_spacing: data.letter_spacing || "normal",
        box_shadow: data.box_shadow || "none",
        backdrop_blur: data.backdrop_blur || "0",
        transition_type: (data.transition_type as 'fade' | 'slide' | 'scale') || 'fade',
        security_settings: securitySettings,
        updated_at: data.updated_at,
        updated_by: data.updated_by,
        metadata: metadata
      };

      console.log("Settings fetched successfully:", settings);
      return settings;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
