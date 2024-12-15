import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { useSettingsForm } from "../hooks/useSettingsForm";
import { BasicSettingsSection } from "./BasicSettingsSection";
import { FontSettingsSection } from "./FontSettingsSection";
import { AdvancedCSSSection } from "./AdvancedCSSSection";
import { FontColorSettingsSection } from "./FontColorSettingsSection";
import { AnimationsSection } from "./AnimationsSection";
import { toast } from "sonner";

export const SettingsFormContainer = () => {
  const { form, onSubmit, isSubmitting } = useSettingsForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const values = form.getValues();
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to save settings");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-gray-800/50 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            <BasicSettingsSection register={form.register} formState={form.formState} />
            <FontSettingsSection form={form} />
            <FontColorSettingsSection />
            <AdvancedCSSSection form={form} />
            <AnimationsSection />
          </Accordion>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};