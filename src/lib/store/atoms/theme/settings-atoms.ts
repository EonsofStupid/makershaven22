import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { supabase } from "@/integrations/supabase/client";
import type { Settings, SettingsUpdateParams } from '@/components/admin/settings/types/settings';

const DEFAULT_SETTINGS: Settings = {
  site_title: 'MakersImpulse',
  tagline: 'Create, Share, Inspire',
  primary_color: '#7FFFD4',
  secondary_color: '#FFB6C1',
  accent_color: '#E6E6FA',
  text_primary_color: '#FFFFFF',
  text_secondary_color: '#A1A1AA',
  text_link_color: '#3B82F6',
  text_heading_color: '#FFFFFF',
  neon_cyan: '#41f0db',
  neon_pink: '#ff0abe',
  neon_purple: '#8000ff',
  border_radius: '0.5rem',
  spacing_unit: '1rem',
  transition_duration: '0.3s',
  shadow_color: '#000000',
  hover_scale: '1.05',
  font_family_heading: 'Inter',
  font_family_body: 'Inter',
  font_size_base: '16px',
  font_weight_normal: '400',
  font_weight_bold: '700',
  line_height_base: '1.5',
  letter_spacing: 'normal',
  transition_type: 'fade'
};

export const settingsAtom = atomWithStorage<Settings>('settings', DEFAULT_SETTINGS);

export const settingsLoadingAtom = atom(false);
export const settingsErrorAtom = atom<Error | null>(null);

// Derived atoms for specific settings
export const primaryColorAtom = atom((get) => get(settingsAtom).primary_color);
export const secondaryColorAtom = atom((get) => get(settingsAtom).secondary_color);
export const accentColorAtom = atom((get) => get(settingsAtom).accent_color);

// Action atom for updating settings
export const updateSettingsAtom = atom(
  null,
  async (get, set, updates: Partial<Settings>) => {
    set(settingsLoadingAtom, true);
    
    try {
      const currentSettings = get(settingsAtom);
      const params: SettingsUpdateParams = {
        p_site_title: updates.site_title || currentSettings.site_title,
        p_tagline: updates.tagline || currentSettings.tagline,
        p_primary_color: updates.primary_color || currentSettings.primary_color,
        p_secondary_color: updates.secondary_color || currentSettings.secondary_color,
        p_accent_color: updates.accent_color || currentSettings.accent_color,
        p_text_primary_color: updates.text_primary_color || currentSettings.text_primary_color,
        p_text_secondary_color: updates.text_secondary_color || currentSettings.text_secondary_color,
        p_text_link_color: updates.text_link_color || currentSettings.text_link_color,
        p_text_heading_color: updates.text_heading_color || currentSettings.text_heading_color,
        p_neon_cyan: updates.neon_cyan || currentSettings.neon_cyan,
        p_neon_pink: updates.neon_pink || currentSettings.neon_pink,
        p_neon_purple: updates.neon_purple || currentSettings.neon_purple,
        p_border_radius: updates.border_radius || currentSettings.border_radius,
        p_spacing_unit: updates.spacing_unit || currentSettings.spacing_unit,
        p_transition_duration: updates.transition_duration || currentSettings.transition_duration,
        p_shadow_color: updates.shadow_color || currentSettings.shadow_color,
        p_hover_scale: updates.hover_scale || currentSettings.hover_scale,
        p_font_family_heading: updates.font_family_heading || currentSettings.font_family_heading,
        p_font_family_body: updates.font_family_body || currentSettings.font_family_body,
        p_font_size_base: updates.font_size_base || currentSettings.font_size_base,
        p_font_weight_normal: updates.font_weight_normal || currentSettings.font_weight_normal,
        p_font_weight_bold: updates.font_weight_bold || currentSettings.font_weight_bold,
        p_line_height_base: updates.line_height_base || currentSettings.line_height_base,
        p_letter_spacing: updates.letter_spacing || currentSettings.letter_spacing
      };

      const { data, error } = await supabase.rpc('update_site_settings', params);
      
      if (error) throw error;
      
      set(settingsAtom, { ...currentSettings, ...updates });
      set(settingsErrorAtom, null);
    } catch (error) {
      set(settingsErrorAtom, error as Error);
      throw error;
    } finally {
      set(settingsLoadingAtom, false);
    }
  }
);