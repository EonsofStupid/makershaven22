
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { queryKeys } from './keys';
import type { Settings, SettingsRecord } from '../types/data/settings';
import { toast } from 'sonner';
import { SettingsFormData } from '@/components/admin/settings/types/settings';

// Transform database record to UI settings
const transformSettingsRecord = (record: SettingsRecord): Settings => ({
  site_title: record.site_title,
  tagline: record.tagline,
  primary_color: record.primary_color,
  secondary_color: record.secondary_color,
  accent_color: record.accent_color,
  text_primary_color: record.text_primary_color,
  text_secondary_color: record.text_secondary_color,
  text_link_color: record.text_link_color,
  text_heading_color: record.text_heading_color,
  neon_cyan: record.neon_cyan,
  neon_pink: record.neon_pink,
  neon_purple: record.neon_purple,
  border_radius: record.border_radius,
  spacing_unit: record.spacing_unit,
  transition_duration: record.transition_duration,
  shadow_color: record.shadow_color,
  hover_scale: record.hover_scale,
  font_family_heading: record.font_family_heading,
  font_family_body: record.font_family_body,
  font_size_base: record.font_size_base,
  font_weight_normal: record.font_weight_normal,
  font_weight_bold: record.font_weight_bold,
  line_height_base: record.line_height_base,
  letter_spacing: record.letter_spacing,
  box_shadow: record.box_shadow,
  backdrop_blur: record.backdrop_blur,
  transition_type: record.transition_type,
  menu_animation_type: record.menu_animation_type,
  security_settings: record.security_settings
});

// Transform UI settings to update parameters
const transformSettingsToUpdateParams = (settings: SettingsFormData) => ({
  p_site_title: settings.site_title,
  p_tagline: settings.tagline || '',
  p_primary_color: settings.primary_color,
  p_secondary_color: settings.secondary_color,
  p_accent_color: settings.accent_color,
  p_text_primary_color: settings.text_primary_color,
  p_text_secondary_color: settings.text_secondary_color,
  p_text_link_color: settings.text_link_color,
  p_text_heading_color: settings.text_heading_color,
  p_neon_cyan: settings.neon_cyan || '',
  p_neon_pink: settings.neon_pink || '',
  p_neon_purple: settings.neon_purple || '',
  p_border_radius: settings.border_radius,
  p_spacing_unit: settings.spacing_unit,
  p_transition_duration: settings.transition_duration,
  p_shadow_color: settings.shadow_color,
  p_hover_scale: settings.hover_scale,
  p_font_family_heading: settings.font_family_heading,
  p_font_family_body: settings.font_family_body,
  p_font_size_base: settings.font_size_base,
  p_font_weight_normal: settings.font_weight_normal,
  p_font_weight_bold: settings.font_weight_bold,
  p_line_height_base: settings.line_height_base,
  p_letter_spacing: settings.letter_spacing,
  p_box_shadow: settings.box_shadow,
  p_backdrop_blur: settings.backdrop_blur,
  p_transition_type: settings.transition_type
});

export const useSettings = () => {
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to load settings');
        throw error;
      }

      // Type assertion to handle the transformation safely
      return transformSettingsRecord(data as unknown as SettingsRecord);
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: SettingsFormData) => {
      const updateParams = transformSettingsToUpdateParams(settings);
      const { error } = await supabase.rpc('update_site_settings', updateParams);

      if (error) throw error;
      return settings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    }
  });
};
