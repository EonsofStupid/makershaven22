
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { queryKeys } from './keys';
import type { Settings } from '@/lib/types/settings/core';
import type { SettingsRecord, transformDatabaseToSettings } from '@/lib/types/database/tables/settings';
import { toast } from 'sonner';

// Transform UI settings to update parameters
const transformSettingsToUpdateParams = (settings: Settings) => ({
  p_site_title: settings.site_title || '',
  p_tagline: settings.tagline || '',
  p_primary_color: settings.primary_color || '#7FFFD4',
  p_secondary_color: settings.secondary_color || '#FFB6C1',
  p_accent_color: settings.accent_color || '#E6E6FA',
  p_text_primary_color: settings.text_primary_color || '#FFFFFF',
  p_text_secondary_color: settings.text_secondary_color || '#A1A1AA',
  p_text_link_color: settings.text_link_color || '#3B82F6',
  p_text_heading_color: settings.text_heading_color || '#FFFFFF',
  p_neon_cyan: settings.neon_cyan || '#41f0db',
  p_neon_pink: settings.neon_pink || '#ff0abe',
  p_neon_purple: settings.neon_purple || '#8000ff',
  p_border_radius: settings.border_radius || '0.5rem',
  p_spacing_unit: settings.spacing_unit || '1rem',
  p_transition_duration: settings.transition_duration || '0.3s',
  p_shadow_color: settings.shadow_color || '#000000',
  p_hover_scale: settings.hover_scale || '1.05',
  p_font_family_heading: settings.font_family_heading || 'Inter',
  p_font_family_body: settings.font_family_body || 'Inter',
  p_font_size_base: settings.font_size_base || '16px',
  p_font_weight_normal: settings.font_weight_normal || '400',
  p_font_weight_bold: settings.font_weight_bold || '700',
  p_line_height_base: settings.line_height_base || '1.5',
  p_letter_spacing: settings.letter_spacing || 'normal',
  p_box_shadow: settings.box_shadow || 'none',
  p_backdrop_blur: settings.backdrop_blur || '0',
  p_transition_type: settings.transition_type || 'fade'
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

      // Transform database record to UI Settings
      return transformDatabaseToSettings(data as SettingsRecord);
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Settings) => {
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
