
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { UseFormReturn } from "react-hook-form";
import { FlattenedSettings } from "@/lib/types/settings/types";
import { ThemeImportSection } from "../sections/ThemeImportSection";
import { ColorSection } from "../sections/ColorSection";
import { TextStylesSection } from "../sections/TextStylesSection";
import { LayoutSection } from "../sections/LayoutSection";
import { SecuritySection } from "../sections/SecuritySection";
import { TransitionConfigSection } from "../sections/TransitionConfigSection";
import { AnimationsSection } from "../sections/AnimationsSection";
import { AdvancedEffectsSection } from "../sections/AdvancedEffectsSection";

interface SettingsAccordionProps {
  form: UseFormReturn<FlattenedSettings>;
}

export const SettingsAccordion: React.FC<SettingsAccordionProps> = ({ form }) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      <ThemeImportSection form={form} />
      <ColorSection form={form} />
      <TextStylesSection form={form} />
      <LayoutSection form={form} />
      <SecuritySection form={form} />
      <TransitionConfigSection form={form} />
      <AnimationsSection form={form} />
      <AdvancedEffectsSection form={form} />
    </Accordion>
  );
};
