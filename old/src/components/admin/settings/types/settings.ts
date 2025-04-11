
import { FlattenedSettings } from "@/lib/types/settings/core";

// Use the global FlattenedSettings type as our source of truth
export type Settings = FlattenedSettings;
// For backward compatibility, point SettingsFormData to FlattenedSettings
export type SettingsFormData = FlattenedSettings;

export interface SettingsResponse {
  data: Settings | null;
  error: null | {
    message: string;
  };
}

export interface UseSettingsFormReturn {
  form: any;
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  logoFile: File | null;
  faviconFile: File | null;
  handleLogoUpload: (file: File) => Promise<void>;
  handleFaviconUpload: (file: File) => Promise<void>;
  handleSettingsUpdate: (data: Settings) => Promise<void>;
  handleResetToDefault: () => Promise<void>;
}
