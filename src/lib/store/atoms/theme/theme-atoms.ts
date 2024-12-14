import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';

export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');
export const systemThemeAtom = atom<'light' | 'dark'>('dark');

export const effectiveThemeAtom = atom((get) => {
  const themeMode = get(themeModeAtom);
  const systemTheme = get(systemThemeAtom);
  return themeMode === 'system' ? systemTheme : themeMode;
});

export const themeAtom = atom<Theme>({
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

export const updateThemeAtom = atom(
  null,
  (get, set, updates: Partial<Settings>) => {
    const current = get(themeAtom);
    set(themeAtom, {
      ...current,
      settings: { ...current.settings, ...updates }
    });
  }
);