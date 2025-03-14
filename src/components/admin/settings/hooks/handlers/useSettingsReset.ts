
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FlattenedSettings } from "@/lib/types/settings/types";
import { SettingsResponse } from "../../types";
import { DEFAULT_SETTINGS } from "../useSettingsDefaults";
import { isJsonObject, safeRecord } from "@/lib/utils/type-utils";
import { SecuritySettings } from "@/lib/types/security/types";

export const useSettingsReset = () => {
  const [isResetting, setIsResetting] = useState(false);

  const handleResetToDefault = async () => {
    console.log("Resetting settings to default...");
    setIsResetting(true);
    try {
      // Update site settings with default values
      const { data, error } = await supabase
        .from('site_settings')
        .update({
          site_title: DEFAULT_SETTINGS.site_title,
          tagline: DEFAULT_SETTINGS.tagline,
          primary_color: DEFAULT_SETTINGS.primary_color,
          secondary_color: DEFAULT_SETTINGS.secondary_color,
          accent_color: DEFAULT_SETTINGS.accent_color,
          text_primary_color: DEFAULT_SETTINGS.text_primary_color,
          text_secondary_color: DEFAULT_SETTINGS.text_secondary_color,
          text_link_color: DEFAULT_SETTINGS.text_link_color,
          text_heading_color: DEFAULT_SETTINGS.text_heading_color,
          neon_cyan: DEFAULT_SETTINGS.neon_cyan,
          neon_pink: DEFAULT_SETTINGS.neon_pink,
          neon_purple: DEFAULT_SETTINGS.neon_purple,
          border_radius: DEFAULT_SETTINGS.border_radius,
          spacing_unit: DEFAULT_SETTINGS.spacing_unit,
          transition_duration: DEFAULT_SETTINGS.transition_duration,
          shadow_color: DEFAULT_SETTINGS.shadow_color,
          hover_scale: DEFAULT_SETTINGS.hover_scale,
          font_family_heading: DEFAULT_SETTINGS.font_family_heading,
          font_family_body: DEFAULT_SETTINGS.font_family_body,
          font_size_base: DEFAULT_SETTINGS.font_size_base,
          font_weight_normal: DEFAULT_SETTINGS.font_weight_normal,
          font_weight_bold: DEFAULT_SETTINGS.font_weight_bold,
          line_height_base: DEFAULT_SETTINGS.line_height_base,
          letter_spacing: DEFAULT_SETTINGS.letter_spacing,
          box_shadow: DEFAULT_SETTINGS.box_shadow,
          backdrop_blur: DEFAULT_SETTINGS.backdrop_blur,
          transition_type: DEFAULT_SETTINGS.transition_type,
          security_settings: DEFAULT_SETTINGS.security_settings
        })
        .eq('id', '1') // Use a string instead of a number for the ID
        .select()
        .single();

      if (error) throw error;
      
      console.log("Settings reset successfully:", data);
      
      // Process and convert the response data to match our FlattenedSettings type
      // Create default security settings
      const defaultSecuritySettings: SecuritySettings = {
        enable_ip_filtering: false,
        two_factor_auth: false,
        max_login_attempts: 5
      };
      
      // Process security_settings from JSON to SecuritySettings type
      let securitySettings: SecuritySettings;
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
      
      // Process metadata
      const metadata = safeRecord(data.metadata);
      
      // Create a properly typed FlattenedSettings object
      const settingsResult: FlattenedSettings = {
        ...data,
        security_settings: securitySettings,
        metadata: metadata
      };
      
      return { data: settingsResult, error: null };
    } catch (error) {
      console.error("Error resetting settings:", error);
      throw error;
    } finally {
      setIsResetting(false);
    }
  };

  return {
    isResetting,
    handleResetToDefault,
  };
};
