import React from "react";
import { Loader2 } from "lucide-react";
import { useSettingsStore } from '@/lib/store/settings-store';
import { SettingsFormContainer } from "./components/SettingsFormContainer";

export const SettingsForm = () => {
  const isLoading = useSettingsStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return <SettingsFormContainer />;
};