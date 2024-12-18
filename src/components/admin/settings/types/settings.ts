import { z } from "zod";
import { settingsSchema } from "./schema";

export type Settings = z.infer<typeof settingsSchema>;

export type SettingsFormData = Settings;

export interface SettingsResponse {
  data: Settings;
  error: null | Error;
}

export interface UseSettingsFormReturn {
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  isResetting: boolean;
  logoFile: File | null;
  faviconFile: File | null;
  form: any; // We'll properly type this with react-hook-form types
  handleLogoUpload: (file: File) => Promise<void>;
  handleFaviconUpload: (file: File) => Promise<void>;
  handleSettingsUpdate: (settings: Settings) => Promise<void>;
  handleResetToDefault: () => Promise<void>;
}