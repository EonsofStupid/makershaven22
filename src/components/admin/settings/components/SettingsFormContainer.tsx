import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SettingsFormHeader } from "./SettingsFormHeader";
import { SettingsFormContent } from "./SettingsFormContent";
import { SavingIndicator } from "./SavingIndicator";
import { ResetDialog } from "./ResetDialog";
import { useSettingsFormState } from "../hooks/useSettingsFormState";

export const SettingsFormContainer = () => {
  const {
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
  } = useSettingsFormState();

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
          <SettingsFormContent />
          <SavingIndicator isSaving={isSaving} />
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