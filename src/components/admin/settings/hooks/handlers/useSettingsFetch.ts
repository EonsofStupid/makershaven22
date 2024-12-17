import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Settings } from "../../types";

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

      const settings: Settings = {
        id: data.id,
        site_title: data.site_title,
        tagline: data.tagline,
        primary_color: data.primary_color,
        secondary_color: data.secondary_color,
        accent_color: data.accent_color,
        logo_url: data.logo_url,
        favicon_url: data.favicon_url,
        text_primary_color: data.text_primary_color,
        text_secondary_color: data.text_secondary_color,
        text_link_color: data.text_link_color,
        text_heading_color: data.text_heading_color,
        neon_cyan: data.neon_cyan || '#41f0db',
        neon_pink: data.neon_pink || '#ff0abe',
        neon_purple: data.neon_purple || '#8000ff',
        border_radius: data.border_radius || '0.5rem',
        spacing_unit: data.spacing_unit || '1rem',
        transition_duration: data.transition_duration || '0.3s',
        shadow_color: data.shadow_color || 'rgba(0,0,0,0.1)',
        hover_scale: data.hover_scale || '1.05',
        font_family_heading: data.font_family_heading,
        font_family_body: data.font_family_body,
        font_size_base: data.font_size_base,
        font_weight_normal: data.font_weight_normal,
        font_weight_bold: data.font_weight_bold,
        line_height_base: data.line_height_base,
        letter_spacing: data.letter_spacing,
        transition_type: data.transition_type || 'fade',
        box_shadow: data.box_shadow || 'none',
        backdrop_blur: data.backdrop_blur || '0',
        updated_at: data.updated_at,
        updated_by: data.updated_by,
        security_settings: data.security_settings,
        state_version: data.state_version,
        last_sync: data.last_sync
      };

      console.log("Settings fetched successfully:", settings);
      return settings;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};