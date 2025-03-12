
import { z } from "zod";
import { settingsSchema } from "./schema";
import { Settings } from "@/lib/types/settings/core";
import { UseFormReturn } from "react-hook-form";

// Use the inferred type from the schema to ensure form data and Settings type are aligned
export type SettingsFormData = Settings;

export interface SettingsResponse {
  data: Settings;
  error: null | {
    message: string;
  };
}

// Update interface to use Settings for form-related properties
export interface UseSettingsFormReturn {
  form: UseFormReturn<Settings>;
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  logoFile: File | null;
  faviconFile: File | null;
  handleLogoUpload: (file: File) => Promise<void>;
  handleFaviconUpload: (file: File) => Promise<void>;
  handleSettingsUpdate: (data: Settings) => Promise<void>;
  handleResetToDefault: () => Promise<Settings>;
}
