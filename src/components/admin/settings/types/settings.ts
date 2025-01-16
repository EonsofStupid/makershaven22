import { z } from "zod";
import { settingsSchema } from "./schema";

export type Settings = z.infer<typeof settingsSchema>;
export type SettingsFormData = Settings;

export interface SettingsResponse {
  data: Settings;
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