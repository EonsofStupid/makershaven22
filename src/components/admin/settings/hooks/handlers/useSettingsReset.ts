
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Settings } from "@/lib/types/settings/core";
import { DEFAULT_SETTINGS } from "../useSettingsDefaults";

export const useSettingsReset = () => {
  const [isResetting, setIsResetting] = useState(false);

  const handleResetToDefault = async (): Promise<Settings> => {
    console.log("Resetting settings to default...");
    setIsResetting(true);
    try {
      const { data, error } = await supabase.rpc('update_site_settings', {
        p_site_title: DEFAULT_SETTINGS.site_title,
        p_tagline: DEFAULT_SETTINGS.tagline || '',
        p_primary_color: DEFAULT_SETTINGS.primary_color,
        p_secondary_color: DEFAULT_SETTINGS.secondary_color,
        p_accent_color: DEFAULT_SETTINGS.accent_color,
        p_text_primary_color: DEFAULT_SETTINGS.text_primary_color,
        p_text_secondary_color: DEFAULT_SETTINGS.text_secondary_color,
        p_text_link_color: DEFAULT_SETTINGS.text_link_color,
        p_text_heading_color: DEFAULT_SETTINGS.text_heading_color,
        p_neon_cyan: DEFAULT_SETTINGS.neon_cyan || '',
        p_neon_pink: DEFAULT_SETTINGS.neon_pink || '',
        p_neon_purple: DEFAULT_SETTINGS.neon_purple || '',
        p_border_radius: DEFAULT_SETTINGS.border_radius,
        p_spacing_unit: DEFAULT_SETTINGS.spacing_unit,
        p_transition_duration: DEFAULT_SETTINGS.transition_duration,
        p_shadow_color: DEFAULT_SETTINGS.shadow_color,
        p_hover_scale: DEFAULT_SETTINGS.hover_scale,
        p_font_family_heading: DEFAULT_SETTINGS.font_family_heading,
        p_font_family_body: DEFAULT_SETTINGS.font_family_body,
        p_font_size_base: DEFAULT_SETTINGS.font_size_base,
        p_font_weight_normal: DEFAULT_SETTINGS.font_weight_normal,
        p_font_weight_bold: DEFAULT_SETTINGS.font_weight_bold,
        p_line_height_base: DEFAULT_SETTINGS.line_height_base,
        p_letter_spacing: DEFAULT_SETTINGS.letter_spacing,
        p_transition_type: DEFAULT_SETTINGS.transition_type
      });

      if (error) throw error;
      
      console.log("Settings reset successfully:", data);
      
      // Convert the data to Settings type
      const settings: Settings = {
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
      };
      
      return settings;
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
