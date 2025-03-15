
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FlattenedSettings } from "@/lib/types/settings/types";
import { SettingsResponse } from "../../types";
import { DEFAULT_SETTINGS } from "@/lib/types/settings/core";
import { ensureJson } from "@/lib/utils/type-utils";
import { processDatabaseSettings } from "@/lib/utils/settings/process-utils";

export const useSettingsReset = () => {
  const [isResetting, setIsResetting] = useState(false);

  const handleResetToDefault = async (): Promise<SettingsResponse> => {
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
          security_settings: ensureJson(DEFAULT_SETTINGS.security_settings)
        })
        .eq('id', '1') // Use string instead of number
        .select()
        .single();

      if (error) throw error;
      
      console.log("Settings reset successfully:", data);
      
      // Process the returned data using our utility
      const processedSettings = processDatabaseSettings(data);
      
      toast.success("Settings reset to defaults");
      
      return { data: processedSettings, error: null };
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast.error("Failed to reset settings");
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return { 
        data: null as unknown as FlattenedSettings, 
        error: { message: errorMessage } 
      };
    } finally {
      setIsResetting(false);
    }
  };

  return {
    isResetting,
    handleResetToDefault,
  };
};
