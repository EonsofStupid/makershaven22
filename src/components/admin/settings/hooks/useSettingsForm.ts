import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettingsStore } from "@/lib/store/settings-store";
import { Settings, SettingsFormData, settingsSchema, UseSettingsFormReturn } from "../types";
import { useSettingsUpdateHandlers } from "./handlers/useSettingsUpdateHandlers";
import { useSettingsFetch } from "./handlers/useSettingsFetch";
import { useSettingsReset } from "./handlers/useSettingsReset";

export const useSettingsForm = (): UseSettingsFormReturn => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const { data: settings, isLoading } = useSettingsFetch();
  const { handleMediaUpload, isSaving } = useSettingsUpdateHandlers();
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
    await handleMediaUpload(formData as any, 'settings');
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