import { z } from "zod";
import { settingsSchema } from "./schema";

export type Settings = z.infer<typeof settingsSchema>;

export interface SettingsResponse {
  data: Settings;
  error: null | Error;
}

export interface SettingsFormData extends Settings {
  updated_at?: string;
  updated_by?: string;
}

export interface UseSettingsFormReturn {
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  isResetting: boolean;
  logoFile: File | null;
  faviconFile: File | null;
  form: any;
  handleLogoUpload: (file: File) => Promise<void>;
  handleFaviconUpload: (file: File) => Promise<void>;
  handleSettingsUpdate: (settings: Settings) => Promise<void>;
  handleResetToDefault: () => Promise<void>;
}