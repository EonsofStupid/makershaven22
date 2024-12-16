import { Settings } from "@/components/admin/settings/types/settings";

export interface Theme extends Settings {}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  updateTheme: (theme: Partial<Theme>) => Promise<void>;
}