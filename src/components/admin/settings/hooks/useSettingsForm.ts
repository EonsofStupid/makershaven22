import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "../types/schema";
import { useStore } from "@/lib/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Settings } from "@/lib/types/settings";
import type { SettingsFormData } from "../types/settings";

export const useSettingsForm = () => {
  const queryClient = useQueryClient();
  const { settings: globalSettings, updateSettings } = useStore();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data as Settings;
    }
  });

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || {}
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (values: SettingsFormData) => {
      const { data, error } = await supabase
        .rpc("update_site_settings", {
          p_site_title: values.site_title,
          p_tagline: values.tagline,
          p_primary_color: values.primary_color,
          p_secondary_color: values.secondary_color,
          p_accent_color: values.accent_color,
          p_text_primary_color: values.text_primary_color,
          p_text_secondary_color: values.text_secondary_color,
          p_text_link_color: values.text_link_color,
          p_text_heading_color: values.text_heading_color,
          p_font_family_heading: values.font_family_heading,
          p_font_family_body: values.font_family_body,
          p_font_size_base: values.font_size_base,
          p_font_weight_normal: values.font_weight_normal,
          p_font_weight_bold: values.font_weight_bold,
          p_line_height_base: values.line_height_base,
          p_letter_spacing: values.letter_spacing,
          p_neon_cyan: values.neon_cyan,
          p_neon_pink: values.neon_pink,
          p_neon_purple: values.neon_purple,
          p_border_radius: values.border_radius,
          p_spacing_unit: values.spacing_unit,
          p_transition_duration: values.transition_duration,
          p_shadow_color: values.shadow_color,
          p_hover_scale: values.hover_scale
        });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      updateSettings(data);
      toast.success("Settings updated successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to update settings:", error);
      toast.error("Failed to update settings", {
        description: error.message
      });
    }
  });

  const onSubmit = async (values: SettingsFormData) => {
    await updateSettingsMutation.mutateAsync(values);
  };

  return {
    form,
    settings,
    isLoading,
    onSubmit,
    isSubmitting: updateSettingsMutation.isPending
  };
};