import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';
import { supabase } from "@/integrations/supabase/client";

export const themeAtom = atomWithStorage<Theme>('theme', {
  settings: {
    site_title: 'MakersImpulse',
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
    font_family_heading: 'Inter',
    font_family_body: 'Inter',
    font_size_base: '16px',
    font_weight_normal: '400',
    font_weight_bold: '700',
    line_height_base: '1.5',
    letter_spacing: 'normal',
    border_radius: '0.5rem',
    spacing_unit: '1rem',
    transition_duration: '0.3s',
    shadow_color: '#000000',
    hover_scale: '1.05',
    transition_type: 'fade'
  },
  mode: 'system'
});

export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');
export const systemThemeAtom = atom<'light' | 'dark'>('dark');

export const effectiveThemeAtom = atom((get) => {
  const themeMode = get(themeModeAtom);
  const systemTheme = get(systemThemeAtom);
  return themeMode === 'system' ? systemTheme : themeMode;
});

export const updateThemeAtom = atom(
  null,
  async (get, set, updates: Partial<Settings>) => {
    const currentTheme = get(themeAtom);
    
    try {
      const { error } = await supabase.rpc('update_site_settings', {
        p_site_title: updates.site_title || currentTheme.settings.site_title,
        p_tagline: updates.tagline || currentTheme.settings.tagline,
        p_primary_color: updates.primary_color || currentTheme.settings.primary_color,
        p_secondary_color: updates.secondary_color || currentTheme.settings.secondary_color,
        p_accent_color: updates.accent_color || currentTheme.settings.accent_color,
        p_text_primary_color: updates.text_primary_color || currentTheme.settings.text_primary_color,
        p_text_secondary_color: updates.text_secondary_color || currentTheme.settings.text_secondary_color,
        p_text_link_color: updates.text_link_color || currentTheme.settings.text_link_color,
        p_text_heading_color: updates.text_heading_color || currentTheme.settings.text_heading_color,
        p_neon_cyan: updates.neon_cyan || currentTheme.settings.neon_cyan,
        p_neon_pink: updates.neon_pink || currentTheme.settings.neon_pink,
        p_neon_purple: updates.neon_purple || currentTheme.settings.neon_purple,
        p_font_family_heading: updates.font_family_heading || currentTheme.settings.font_family_heading,
        p_font_family_body: updates.font_family_body || currentTheme.settings.font_family_body,
        p_font_size_base: updates.font_size_base || currentTheme.settings.font_size_base,
        p_font_weight_normal: updates.font_weight_normal || currentTheme.settings.font_weight_normal,
        p_font_weight_bold: updates.font_weight_bold || currentTheme.settings.font_weight_bold,
        p_line_height_base: updates.line_height_base || currentTheme.settings.line_height_base,
        p_letter_spacing: updates.letter_spacing || currentTheme.settings.letter_spacing,
        p_border_radius: updates.border_radius || currentTheme.settings.border_radius,
        p_spacing_unit: updates.spacing_unit || currentTheme.settings.spacing_unit,
        p_transition_duration: updates.transition_duration || currentTheme.settings.transition_duration,
        p_shadow_color: updates.shadow_color || currentTheme.settings.shadow_color,
        p_hover_scale: updates.hover_scale || currentTheme.settings.hover_scale
      });

      if (error) throw error;
      
      set(themeAtom, {
        ...currentTheme,
        settings: { ...currentTheme.settings, ...updates }
      });
      
    } catch (error) {
      console.error("Error updating theme:", error);
      throw error;
    }
  }
);