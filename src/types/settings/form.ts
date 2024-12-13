import { ThemeSettings } from "./theme";
import { SecuritySettings } from "./security";

export interface SettingsFormData extends ThemeSettings {
  security_settings?: SecuritySettings;
}

export interface SettingsFormState {
  isLoading: boolean;
  isSaving: boolean;
  error: Error | null;
}