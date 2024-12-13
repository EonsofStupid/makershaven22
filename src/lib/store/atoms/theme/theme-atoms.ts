import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Settings } from '@/components/admin/settings/types';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
}

const initialThemeState: ThemeState = {
  mode: 'system',
  settings: null,
  isLoading: false,
  error: null
};

// Persist theme mode preference
export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');

// Theme state atom
export const themeStateAtom = atom<ThemeState>(initialThemeState);

// System theme detection
export const systemThemeAtom = atom<'light' | 'dark'>('dark');

// Computed effective theme
export const effectiveThemeAtom = atom((get) => {
  const themeMode = get(themeModeAtom);
  const systemTheme = get(systemThemeAtom);
  
  return themeMode === 'system' ? systemTheme : themeMode;
});

// CSS Variables atom
export const cssVariablesAtom = atom(
  (get) => {
    const settings = get(themeStateAtom).settings;
    if (!settings) return {};
    
    return {
      '--primary': settings.primary_color,
      '--secondary': settings.secondary_color,
      '--accent': settings.accent_color,
      '--text-primary': settings.text_primary_color,
      '--text-secondary': settings.text_secondary_color,
      '--text-link': settings.text_link_color,
      '--text-heading': settings.text_heading_color,
      '--neon-cyan': settings.neon_cyan,
      '--neon-pink': settings.neon_pink,
      '--neon-purple': settings.neon_purple,
      '--border-radius': settings.border_radius,
      '--spacing-unit': settings.spacing_unit,
      '--transition-duration': settings.transition_duration,
      '--shadow-color': settings.shadow_color,
      '--hover-scale': settings.hover_scale,
      '--font-heading': settings.font_family_heading,
      '--font-body': settings.font_family_body,
      '--font-size-base': settings.font_size_base,
      '--font-weight-normal': settings.font_weight_normal,
      '--font-weight-bold': settings.font_weight_bold,
      '--line-height-base': settings.line_height_base,
      '--letter-spacing': settings.letter_spacing,
      '--box-shadow': settings.box_shadow || 'none',
      '--backdrop-blur': settings.backdrop_blur || '0'
    };
  }
);

// Theme update action atom
export const updateThemeAtom = atom(
  null,
  async (get, set, updates: Partial<Settings>) => {
    const currentState = get(themeStateAtom);
    
    try {
      set(themeStateAtom, { ...currentState, isLoading: true });
      
      const { data, error } = await supabase.rpc('update_site_settings', {
        p_site_title: updates.site_title || currentState.settings?.site_title || '',
        p_tagline: updates.tagline || currentState.settings?.tagline || '',
        p_primary_color: updates.primary_color || currentState.settings?.primary_color || '',
        p_secondary_color: updates.secondary_color || currentState.settings?.secondary_color || '',
        p_accent_color: updates.accent_color || currentState.settings?.accent_color || '',
        p_text_primary_color: updates.text_primary_color || currentState.settings?.text_primary_color || '',
        p_text_secondary_color: updates.text_secondary_color || currentState.settings?.text_secondary_color || '',
        p_text_link_color: updates.text_link_color || currentState.settings?.text_link_color || '',
        p_text_heading_color: updates.text_heading_color || currentState.settings?.text_heading_color || '',
        p_neon_cyan: updates.neon_cyan || currentState.settings?.neon_cyan || '',
        p_neon_pink: updates.neon_pink || currentState.settings?.neon_pink || '',
        p_neon_purple: updates.neon_purple || currentState.settings?.neon_purple || '',
        p_font_family_heading: updates.font_family_heading || currentState.settings?.font_family_heading || '',
        p_font_family_body: updates.font_family_body || currentState.settings?.font_family_body || '',
        p_font_size_base: updates.font_size_base || currentState.settings?.font_size_base || '',
        p_font_weight_normal: updates.font_weight_normal || currentState.settings?.font_weight_normal || '',
        p_font_weight_bold: updates.font_weight_bold || currentState.settings?.font_weight_bold || '',
        p_line_height_base: updates.line_height_base || currentState.settings?.line_height_base || '',
        p_letter_spacing: updates.letter_spacing || currentState.settings?.letter_spacing || '',
        p_border_radius: updates.border_radius || currentState.settings?.border_radius || '',
        p_spacing_unit: updates.spacing_unit || currentState.settings?.spacing_unit || '',
        p_transition_duration: updates.transition_duration || currentState.settings?.transition_duration || '',
        p_shadow_color: updates.shadow_color || currentState.settings?.shadow_color || '',
        p_hover_scale: updates.hover_scale || currentState.settings?.hover_scale || ''
      });

      if (error) throw error;
      
      set(themeStateAtom, {
        ...currentState,
        settings: { ...currentState.settings, ...updates },
        isLoading: false,
        error: null
      });
      
    } catch (error) {
      set(themeStateAtom, {
        ...currentState,
        isLoading: false,
        error: error as Error
      });
    }
  }
);