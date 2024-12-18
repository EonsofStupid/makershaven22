import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Settings } from "../../types";
import { toast } from "sonner";

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
        site_title: data.site_title,
        tagline: data.tagline,
        primary_color: data.primary_color,
        secondary_color: data.secondary_color,
        accent_color: data.accent_color,
        logo_url: data.logo_url,
        favicon_url: data.favicon_url,
        theme_mode: data.theme_mode as "light" | "dark" | "system" | undefined,
        text_primary_color: data.text_primary_color,
        text_secondary_color: data.text_secondary_color,
        text_link_color: data.text_link_color,
        text_heading_color: data.text_heading_color,
        neon_cyan: data.neon_cyan,
        neon_pink: data.neon_pink,
        neon_purple: data.neon_purple,
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
        transition_type: data.transition_type,
        menu_animation_type: data.menu_animation_type,
        box_shadow: data.box_shadow,
        backdrop_blur: data.backdrop_blur,
        updated_at: data.updated_at,
        updated_by: data.updated_by,
      };

      return settings;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};