
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { uploadMedia } from "@/utils/media";
import { FlattenedSettings } from "@/lib/types/settings/types";
import { SettingsResponse } from "../../types";
import { isJsonObject, safeRecord } from "@/lib/utils/type-utils";
import { SecuritySettings } from "@/lib/types/security/types";

export const useSettingsUpdateHandlers = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  const handleLogoUpload = async (file: File) => {
    console.log("Handling logo upload with file:", file);
    setLogoFile(file);
  };

  const handleFaviconUpload = async (file: File) => {
    console.log("Handling favicon upload with file:", file);
    setFaviconFile(file);
  };

  const handleSettingsUpdate = async (formData: FlattenedSettings) => {
    console.log("Starting settings update with formData:", formData);
    setIsSaving(true);
    try {
      let logo_url = formData.logo_url;
      let favicon_url = formData.favicon_url;

      if (logoFile) {
        console.log("Uploading new logo file...");
        logo_url = await uploadMedia(logoFile);
        console.log("Logo uploaded successfully:", logo_url);
      }

      if (faviconFile) {
        console.log("Uploading new favicon file...");
        favicon_url = await uploadMedia(faviconFile);
        console.log("Favicon uploaded successfully:", favicon_url);
      }

      // Create a properly structured database object from our typed data
      // Handle metadata and security_settings which need special treatment
      const databaseData = {
        site_title: formData.site_title,
        tagline: formData.tagline,
        primary_color: formData.primary_color,
        secondary_color: formData.secondary_color,
        accent_color: formData.accent_color,
        logo_url: logo_url,
        favicon_url: favicon_url,
        text_primary_color: formData.text_primary_color,
        text_secondary_color: formData.text_secondary_color,
        text_link_color: formData.text_link_color,
        text_heading_color: formData.text_heading_color,
        neon_cyan: formData.neon_cyan,
        neon_pink: formData.neon_pink,
        neon_purple: formData.neon_purple,
        border_radius: formData.border_radius,
        spacing_unit: formData.spacing_unit,
        transition_duration: formData.transition_duration,
        shadow_color: formData.shadow_color,
        hover_scale: formData.hover_scale,
        font_family_heading: formData.font_family_heading,
        font_family_body: formData.font_family_body,
        font_size_base: formData.font_size_base,
        font_weight_normal: formData.font_weight_normal,
        font_weight_bold: formData.font_weight_bold,
        line_height_base: formData.line_height_base,
        letter_spacing: formData.letter_spacing,
        box_shadow: formData.box_shadow,
        backdrop_blur: formData.backdrop_blur,
        transition_type: formData.transition_type,
        metadata: formData.metadata || {},
        security_settings: formData.security_settings
      };

      // Use Supabase update directly
      const { data, error } = await supabase
        .from('site_settings')
        .update(databaseData)
        .eq('id', '1') // Use string instead of number
        .select()
        .single();

      if (error) throw error;

      console.log("Settings updated successfully:", data);
      toast.success("Settings updated successfully");
      
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
      
      return settingsResult;
    } catch (error) {
      console.error("Error in handleSettingsUpdate:", error);
      toast.error("Failed to update settings");
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
  };
};
