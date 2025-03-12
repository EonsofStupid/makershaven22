
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettings, useUpdateSettings } from "@/lib/query/settings";
import { Settings } from "@/lib/types/settings/core";
import { UseSettingsFormReturn } from "../types/settings";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DEFAULT_SETTINGS } from "./useSettingsDefaults";
import { settingsSchema } from "../types/schema";

export const useSettingsForm = (): UseSettingsFormReturn => {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending: isSaving } = useUpdateSettings();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  // Initialize the form with react-hook-form and Zod validation
  const form = useForm<Settings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || DEFAULT_SETTINGS,
    mode: "onChange"
  });

  // Update form values when settings are loaded
  if (settings && !form.formState.isDirty) {
    form.reset(settings);
  }

  const handleLogoUpload = async (file: File) => {
    setLogoFile(file);
  };

  const handleFaviconUpload = async (file: File) => {
    setFaviconFile(file);
  };

  const handleSettingsUpdate = async (data: Settings) => {
    updateSettings(data);
  };

  const handleResetToDefault = async (): Promise<Settings> => {
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
        p_box_shadow: DEFAULT_SETTINGS.box_shadow || 'none',
        p_backdrop_blur: DEFAULT_SETTINGS.backdrop_blur || '0',
        p_transition_type: DEFAULT_SETTINGS.transition_type
      });

      if (error) throw error;
      
      console.log("Settings reset successfully:", data);
      
      // Update the form with the reset settings
      form.reset(DEFAULT_SETTINGS);
      
      return DEFAULT_SETTINGS;
    } catch (error) {
      console.error("Error resetting settings:", error);
      throw error;
    }
  };

  return {
    form,
    settings,
    isLoading,
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault,
  };
};
