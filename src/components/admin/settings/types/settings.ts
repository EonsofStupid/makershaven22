
import { z } from "zod";
import { settingsSchema } from "./schema";
import { Settings } from "@/lib/types/settings/core";
import { UseFormReturn } from "react-hook-form";

// Export the inferred type from the schema
// This ensures form data and Settings type are aligned
export type SettingsFormData = z.infer<typeof settingsSchema>;

export interface SettingsResponse {
  data: Settings;
  error: null | {
    message: string;
  };
}

// Updated interface to use SettingsFormData for form-related properties
export interface UseSettingsFormReturn {
  form: UseFormReturn<SettingsFormData>; // Properly typed with SettingsFormData
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  logoFile: File | null;
  faviconFile: File | null;
  handleLogoUpload: (file: File) => Promise<void>;
  handleFaviconUpload: (file: File) => Promise<void>;
  handleSettingsUpdate: (data: SettingsFormData) => Promise<void>;
  handleResetToDefault: () => Promise<Settings>;
}
