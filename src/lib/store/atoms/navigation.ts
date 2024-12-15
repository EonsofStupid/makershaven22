import { atom } from 'jotai';

interface NavigationSettings {
  menuType: string;
  settings: Record<string, any>;
}

export const navigationSettingsAtom = atom<NavigationSettings>({
  menuType: 'default',
  settings: {}
});