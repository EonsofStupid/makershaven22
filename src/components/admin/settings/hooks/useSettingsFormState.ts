import { useState } from "react";
import { toast } from "sonner";
import { useSettingsForm } from "./useSettingsForm";

export const useSettingsFormState = () => {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  const { handleResetToDefault, isSaving } = useSettingsForm();

  const handleReset = async () => {
    if (resetConfirmation.toUpperCase() !== "IMPULSE" || !confirmCheckbox) {
      toast.error("Please type IMPULSE and check the confirmation box");
      return;
    }

    setIsResetting(true);
    toast.loading("Resetting settings to default...");

    try {
      await handleResetToDefault();
      toast.success("Settings reset successfully");
      setShowResetDialog(false);
      setResetConfirmation("");
      setConfirmCheckbox(false);
    } catch (error) {
      toast.error("Failed to reset settings");
    } finally {
      setIsResetting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleReset();
    }
  };

  return {
    showResetDialog,
    setShowResetDialog,
    resetConfirmation,
    setResetConfirmation,
    confirmCheckbox,
    setConfirmCheckbox,
    isResetting,
    handleReset,
    handleKeyPress,
    isSaving,
  };
};