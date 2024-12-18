import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CSSEffectsControl } from "./CSSEffectsControl";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormData } from "../types";
import { supabase } from "@/integrations/supabase/client";

interface TransitionSettingsSectionProps {
  form: UseFormReturn<SettingsFormData>;
}

export const TransitionSettingsSection: React.FC<TransitionSettingsSectionProps> = ({ form }) => {
  const handleSettingChange = async (updates: Partial<SettingsFormData>) => {
    try {
      const { data, error } = await supabase.rpc('update_site_settings', {
        p_site_title: form.getValues('site_title'),
        p_tagline: form.getValues('tagline'),
        p_primary_color: form.getValues('primary_color'),
        p_secondary_color: form.getValues('secondary_color'),
        p_accent_color: form.getValues('accent_color'),
        p_text_primary_color: form.getValues('text_primary_color'),
        p_text_secondary_color: form.getValues('text_secondary_color'),
        p_text_link_color: form.getValues('text_link_color'),
        p_text_heading_color: form.getValues('text_heading_color'),
        p_neon_cyan: form.getValues('neon_cyan'),
        p_neon_pink: form.getValues('neon_pink'),
        p_neon_purple: form.getValues('neon_purple'),
        p_border_radius: form.getValues('border_radius'),
        p_spacing_unit: form.getValues('spacing_unit'),
        p_transition_duration: form.getValues('transition_duration'),
        p_shadow_color: form.getValues('shadow_color'),
        p_hover_scale: form.getValues('hover_scale'),
        p_font_family_heading: form.getValues('font_family_heading'),
        p_font_family_body: form.getValues('font_family_body'),
        p_font_size_base: form.getValues('font_size_base'),
        p_font_weight_normal: form.getValues('font_weight_normal'),
        p_font_weight_bold: form.getValues('font_weight_bold'),
        p_line_height_base: form.getValues('line_height_base'),
        p_letter_spacing: form.getValues('letter_spacing'),
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <AccordionItem value="transitions">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Transitions & Motion
      </AccordionTrigger>
      <AccordionContent className="space-y-6 pt-4">
        <CSSEffectsControl
          label="Page Transition Duration"
          type="slider"
          value={parseFloat(form.watch('transition_duration'))}
          min={0.1}
          max={1}
          step={0.1}
          onChange={(value) => {
            form.setValue('transition_duration', value.toString());
            handleSettingChange({ transition_duration: value.toString() });
          }}
          description="Duration of page transition animations"
        />

        <CSSEffectsControl
          label="Hover Scale Factor"
          type="slider"
          value={parseFloat(form.watch('hover_scale'))}
          min={1}
          max={1.2}
          step={0.01}
          onChange={(value) => {
            form.setValue('hover_scale', value.toString());
            handleSettingChange({ hover_scale: value.toString() });
          }}
          description="Scale factor for hover animations"
        />
      </AccordionContent>
    </AccordionItem>
  );
};