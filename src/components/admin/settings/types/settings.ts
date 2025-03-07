
import { z } from "zod";
import { settingsSchema } from "./schema";
import { Settings } from "@/lib/types/settings/core";

// Export the inferred type from the schema
// This ensures form data and Settings type are aligned
export type SettingsFormData = z.infer<typeof settingsSchema>;

export interface SettingsResponse {
  data: Settings;
  error: null | {
    message: string;
  };
}

// Update this interface to use SettingsFormData for form-related properties
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
