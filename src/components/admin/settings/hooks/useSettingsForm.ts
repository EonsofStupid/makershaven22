import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings, SettingsFormData, settingsSchema } from "../types";
import { useSettingsUpdateHandlers } from "./handlers/useSettingsUpdateHandlers";
import { useSettingsFetch } from "./handlers/useSettingsFetch";
import { useSettingsReset } from "./handlers/useSettingsReset";

export const useSettingsForm = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const { data: settings, isLoading } = useSettingsFetch();
  const { handleMediaUpload } = useSettingsUpdateHandlers();
  const { isResetting, handleResetToDefault } = useSettingsReset();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || undefined,
  });

  const handleLogoUpload = async (file: File) => {
    setLogoFile(file);
    await handleMediaUpload(file, 'logo_url');
  };

  const handleFaviconUpload = async (file: File) => {
    setFaviconFile(file);
    await handleMediaUpload(file, 'favicon_url');
  };

  const handleSettingsUpdate = async (formData: Settings) => {
    setIsSaving(true);
    try {
      await handleMediaUpload(formData as any, 'settings');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    settings,
    isLoading,
    isSaving,
    isResetting,
    logoFile,
    faviconFile,
    form,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault,
  };
};