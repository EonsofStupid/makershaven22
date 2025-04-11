
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SettingsFormHeader } from "./SettingsFormHeader";
import { SavingIndicator } from "./SavingIndicator";
import { ResetDialog } from "./ResetDialog";
import { useSettingsFormState } from "../hooks/useSettingsFormState";
import { SettingsAccordion } from "./SettingsAccordion";
import { Loader2 } from "lucide-react";
import { SettingsPreview } from "./SettingsPreview";

export const SettingsFormContainer = () => {
  const {
    form,
    isLoading,
    isSaving,
    showResetDialog,
    setShowResetDialog,
    resetConfirmation,
    setResetConfirmation,
    confirmCheckbox,
    setConfirmCheckbox,
    isResetting,
    handleReset,
    handleKeyPress,
    setupFormWatcher,
    getPreviewSettings
  } = useSettingsFormState();

  // Setup form watcher effect
  useEffect(setupFormWatcher, [form.watch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const previewSettings = getPreviewSettings();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-[5%] min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <Card className="p-6 bg-gray-800/50 border border-white/10 backdrop-blur-sm">
          <SettingsFormHeader 
            onResetClick={() => setShowResetDialog(true)}
            isSaving={isSaving}
          />

          <form className="space-y-6">
            <SavingIndicator isSaving={isSaving} />
            <SettingsAccordion form={form} />
          </form>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 bg-gray-800/50 border border-white/10 backdrop-blur-sm sticky top-4">
          <h3 className="text-lg font-medium text-white mb-4">Preview</h3>
          <SettingsPreview settings={previewSettings} />
        </Card>
      </motion.div>

      <ResetDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        onReset={handleReset}
        isResetting={isResetting}
        resetConfirmation={resetConfirmation}
        onResetConfirmationChange={setResetConfirmation}
        confirmCheckbox={confirmCheckbox}
        onConfirmCheckboxChange={setConfirmCheckbox}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};
