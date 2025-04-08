
import { useState } from "react";
import { useSettingsFetch } from "./handlers/useSettingsFetch";
import { useSettingsUpdateHandlers } from "./handlers/useSettingsUpdateHandlers";
import { useSettingsReset } from "./handlers/useSettingsReset";

export const useSettingsForm = () => {
  const { settings, isLoading, error, fetchSettings } = useSettingsFetch();
  const { 
    handleSettingsUpdate, 
    handleFileUpload,
    isUploading 
  } = useSettingsUpdateHandlers();
  const { isResetting, handleSettingsReset } = useSettingsReset();

  // Track file upload state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  // Handle logo upload
  const handleLogoUpload = async (file: File) => {
    setLogoFile(file);
    return await handleFileUpload(file, "logo_url");
  };

  // Handle favicon upload
  const handleFaviconUpload = async (file: File) => {
    setFaviconFile(file);
    return await handleFileUpload(file, "favicon_url");
  };

  // Define isSaving for UI state
  const isSaving = isUploading;
  
  // Map handleSettingsReset to handleResetToDefault for consistency
  const handleResetToDefault = handleSettingsReset;

  return {
    settings,
    isLoading,
    error,
    isSaving,
    isResetting,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault,
    fetchSettings
  };
};
