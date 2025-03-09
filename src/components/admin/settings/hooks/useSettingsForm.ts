
import { useState } from "react";
import { useSettingsFetch } from "./handlers/useSettingsFetch";
import { useSettingsUpdateHandlers } from "./handlers/useSettingsUpdateHandlers";
import { useSettingsReset } from "./handlers/useSettingsReset";
import { Settings } from "@/lib/types/settings/core";
import { UseSettingsFormReturn } from "../types/settings";

export const useSettingsForm = (): UseSettingsFormReturn => {
  const { data: settings, isLoading } = useSettingsFetch();
  const { 
    isSaving, 
    logoFile, 
    faviconFile, 
    handleLogoUpload, 
    handleFaviconUpload, 
    handleSettingsUpdate 
  } = useSettingsUpdateHandlers();
  const { isResetting, handleResetToDefault } = useSettingsReset();

  // Form is provided by the component that uses this hook
  // This makes the hook more reusable
  const form = null;

  return {
    form,
    settings,
    isLoading,
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault,
  };
};
