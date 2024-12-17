import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { useSettingsForm } from "../hooks/useSettingsForm";
import { ThemeImportSection } from "../sections/ThemeImportSection";
import { ColorSection } from "../sections/ColorSection";
import { TextStylesSection } from "../sections/TextStylesSection";
import { LayoutSection } from "../sections/LayoutSection";
import { TransitionConfigSection } from "../sections/TransitionConfigSection";
import { AnimationsSection } from "../sections/AnimationsSection";
import { AdvancedEffectsSection } from "../sections/AdvancedEffectsSection";

export const SettingsFormContent = () => {
  const { form } = useSettingsForm();

  return (
    <form className="space-y-6">
      <Accordion type="single" collapsible className="space-y-4">
        <ThemeImportSection form={form} />
        <ColorSection form={form} />
        <TextStylesSection form={form} />
        <LayoutSection form={form} />
        <TransitionConfigSection form={form} />
        <AnimationsSection form={form} />
        <AdvancedEffectsSection form={form} />
      </Accordion>
    </form>
  );
};