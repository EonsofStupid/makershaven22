
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Settings, SecuritySettings } from '@/lib/types/settings/core';
import { toast } from 'sonner';
import { parseJsonToObject } from '@/lib/types/core/json';

export const useSettingsQuery = () => {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching settings:', error);
        throw error;
      }

      // Transform security settings
      const securitySettings = parseJsonToObject<SecuritySettings>(data.security_settings, {
        enable_ip_filtering: false,
        two_factor_auth: false,
        max_login_attempts: 5,
        ip_whitelist: [],
        ip_blacklist: []
      });

      // Create properly typed settings object
      const settings: Settings = {
        ...data,
        security_settings: securitySettings
      };

      return settings;
    }
  });
};

export const useSettingsMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (settings: Partial<Settings>) => {
      // Create update parameters - include only the fields that exist in the RPC function
      const updateParams: any = {
        p_site_title: settings.site_title,
        p_tagline: settings.tagline || '',
        p_primary_color: settings.primary_color,
        p_secondary_color: settings.secondary_color,
        p_accent_color: settings.accent_color,
        p_text_primary_color: settings.text_primary_color,
        p_text_secondary_color: settings.text_secondary_color,
        p_text_link_color: settings.text_link_color,
        p_text_heading_color: settings.text_heading_color,
        p_neon_cyan: settings.neon_cyan,
        p_neon_pink: settings.neon_pink,
        p_neon_purple: settings.neon_purple,
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
        p_transition_type: settings.transition_type
      };
      
      if (settings.logo_url) {
        updateParams.p_logo_url = settings.logo_url;
      }
      
      if (settings.favicon_url) {
        updateParams.p_favicon_url = settings.favicon_url;
      }
      
      const { error } = await supabase.rpc('update_site_settings', updateParams);
      
      if (error) throw error;
      
      return settings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    }
  });
};

export const useSettings = () => {
  const { data, isLoading, error } = useSettingsQuery();
  const { mutate: updateSettings, isPending: isSaving } = useSettingsMutation();
  
  return {
    settings: data,
    isLoading,
    error,
    updateSettings,
    isSaving
  };
};
