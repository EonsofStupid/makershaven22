
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { uploadMedia } from "@/utils/media";
import { FlattenedSettings } from "@/lib/types/settings/types";
import { SettingsResponse } from "../../types";

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

      // Use Supabase update directly instead of RPC
      const { data, error } = await supabase
        .from('site_settings')
        .update({
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
          metadata: formData.metadata,
          security_settings: formData.security_settings
        })
        .eq('id', 1)
        .select()
        .single();

      if (error) throw error;

      console.log("Settings updated successfully:", data);
      toast.success("Settings updated successfully");
      return data as FlattenedSettings;
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
