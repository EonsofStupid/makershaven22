import React from "react";
import { Loader2 } from "lucide-react";
import { useSettingsForm } from "./hooks/useSettingsForm";
import { SettingsFormContainer } from "./components/SettingsFormContainer";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const SettingsForm = () => {
  const { isLoading } = useSettingsForm();
  const { isReady, error } = useStore();

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <span className="ml-2 text-sm text-gray-400">Initializing settings...</span>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load settings", {
      description: error.message
    });
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error loading settings: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return <SettingsFormContainer />;
};