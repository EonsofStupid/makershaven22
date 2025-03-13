import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useSettingsForm } from "./hooks/useSettingsForm";
import { useThemeContext } from "@/components/theme/ThemeProvider";
import { SettingsPreview } from "./components/SettingsPreview";
import { ResetDialog } from "./components/ResetDialog";
import { SettingsFormHeader } from "./components/SettingsFormHeader";
import { SavingIndicator } from "./components/SavingIndicator";
import { ColorSection } from "./sections/ColorSection";
import { TextStylesSection } from "./sections/TextStylesSection";
import { LayoutSection } from "./sections/LayoutSection";
import { AnimationsSection } from "./sections/AnimationsSection";
import { AdvancedEffectsSection } from "./sections/AdvancedEffectsSection";
import { TransitionConfigSection } from "./sections/TransitionConfigSection";
import { ThemeImportSection } from "./sections/ThemeImportSection";
import { toast } from "sonner";
import { SecuritySection } from "./sections/SecuritySection";
import { Settings } from "@/lib/types/settings/core";

export const SettingsForm = () => {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { updateTheme } = useThemeContext();

  const {
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
  } = useSettingsForm();

  React.useEffect(() => {
    if (!settings || !form) return;
    
    const subscription = form.watch((value) => {
      const formValues = form.getValues() as Settings;
      handleSettingsUpdate(formValues);
      updateTheme(formValues);
    });
    
    return () => subscription.unsubscribe();
  }, [form, settings, handleSettingsUpdate, updateTheme]);

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

  if (isLoading || !form) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

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

          <Form {...form}>
            <form className="space-y-6">
              <SavingIndicator isSaving={isSaving} />
              <Accordion type="single" collapsible className="space-y-4">
                <ThemeImportSection form={form} />
                <ColorSection form={form} />
                <TextStylesSection form={form} />
                <LayoutSection form={form} />
                <TransitionConfigSection form={form} />
                <AnimationsSection form={form} />
                <AdvancedEffectsSection form={form} />
                <SecuritySection form={form} />
              </Accordion>
            </form>
          </Form>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 bg-gray-800/50 border border-white/10 backdrop-blur-sm sticky top-4">
          <h3 className="text-lg font-medium text-white mb-4">Preview</h3>
          <SettingsPreview
            settings={form.watch() as Settings}
          />
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
