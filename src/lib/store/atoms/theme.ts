import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Settings } from '@/components/admin/settings/types';

// Persist theme mode preference
export const themeModeAtom = atomWithStorage<'light' | 'dark' | 'system'>('themeMode', 'system');

// Main theme settings atom with storage
export const themeSettingsAtom = atomWithStorage<Settings>('themeSettings', {
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
  box_shadow: 'none',
  backdrop_blur: '0',
  transition_type: 'fade'
});

// Derived atoms for specific theme values
export const primaryColorAtom = atom(
  (get) => get(themeSettingsAtom).primary_color
);

export const secondaryColorAtom = atom(
  (get) => get(themeSettingsAtom).secondary_color
);

export const accentColorAtom = atom(
  (get) => get(themeSettingsAtom).accent_color
);

// Theme update action atom
export const updateThemeAtom = atom(
  null,
  (get, set, updates: Partial<Settings>) => {
    const currentSettings = get(themeSettingsAtom);
    set(themeSettingsAtom, { ...currentSettings, ...updates });
  }
);

// System theme detection
export const systemThemeAtom = atom<'light' | 'dark'>('dark');

// Computed effective theme
export const effectiveThemeAtom = atom((get) => {
  const themeMode = get(themeModeAtom);
  const systemTheme = get(systemThemeAtom);
  
  return themeMode === 'system' ? systemTheme : themeMode;
});