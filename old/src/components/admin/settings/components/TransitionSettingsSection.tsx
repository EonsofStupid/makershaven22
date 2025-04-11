
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CSSEffectsControl } from "./CSSEffectsControl";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSettingsStore } from "@/lib/store/settings-store";

export const TransitionSettingsSection = () => {
  const { settings, updateSettings } = useSettingsStore();
  const [localSettings, setLocalSettings] = useState({
    pageTransition: parseFloat(settings?.transition_duration?.replace('s', '') || '0.3'),
    transitionType: settings?.transition_type || "ease-out",
    hoverScale: parseFloat(settings?.hover_scale || '1.05'),
    animationPreset: settings?.transition_type || "fade"
  });

  const handleSettingChange = async (key: string, value: number | string) => {
    // Update local state first for immediate feedback
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    
    try {
      // Map local settings keys to the actual settings properties
      let settingsUpdate: Record<string, any> = {};
      
      if (key === 'pageTransition') {
        settingsUpdate.transition_duration = `${value}s`;
      } else if (key === 'hoverScale') {
        settingsUpdate.hover_scale = value.toString();
      } else if (key === 'transitionType') {
        settingsUpdate.transition_type = value as string;
      } else if (key === 'animationPreset') {
        // This might map to a different property if needed
        settingsUpdate.transition_type = value as string;
      }
      
      // Use the settings store to update settings
      await updateSettings(settingsUpdate);
      
      toast.success("Transition settings updated");
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast.error("Failed to update settings");
    }
  };

  return (
    <AccordionItem value="transition-settings">
      <AccordionTrigger className="text-lg font-semibold text-white">
        <motion.div
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.02 }}
          className="flex items-center gap-2"
        >
          Transitions & Motion
        </motion.div>
      </AccordionTrigger>
      <AccordionContent className="space-y-6 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CSSEffectsControl
            label="Page Transition Duration"
            type="slider"
            value={localSettings.pageTransition}
            min={0.1}
            max={1}
            step={0.1}
            onChange={(value) => handleSettingChange('pageTransition', value)}
            description="Duration of page transition animations"
            previewClass="animate-fade-in"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <CSSEffectsControl
            label="Element Transition Type"
            type="select"
            value={localSettings.transitionType}
            options={[
              { label: "Ease Out", value: "ease-out" },
              { label: "Ease In", value: "ease-in" },
              { label: "Linear", value: "linear" }
            ]}
            onChange={(value) => handleSettingChange('transitionType', value)}
            description="Default transition timing function"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <CSSEffectsControl
            label="Hover Scale Factor"
            type="slider"
            value={localSettings.hoverScale}
            min={1}
            max={1.2}
            step={0.01}
            onChange={(value) => handleSettingChange('hoverScale', value)}
            description="Scale factor for hover animations"
            previewClass="hover:scale-110"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <CSSEffectsControl
            label="Animation Preset"
            type="select"
            value={localSettings.animationPreset}
            options={[
              { label: "Fade", value: "fade" },
              { label: "Slide", value: "slide" },
              { label: "Scale", value: "scale" }
            ]}
            onChange={(value) => handleSettingChange('animationPreset', value)}
            description="Default animation preset for elements"
          />
        </motion.div>
      </AccordionContent>
    </AccordionItem>
  );
};
