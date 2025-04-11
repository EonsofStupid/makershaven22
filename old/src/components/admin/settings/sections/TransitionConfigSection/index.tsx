
import React, { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useSettingsStore } from "@/lib/store/settings-store";
import { CSSEffectsControl } from "../../components/CSSEffectsControl";

export const TransitionConfigSection = ({ form }) => {
  const { updateSettings } = useSettingsStore();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleValueChange = async (key, value) => {
    setIsUpdating(true);
    try {
      // Update form value
      form.setValue(key, value);
      
      // Create an update object with just the changed value
      const update = { [key]: value };
      
      // Update settings in the store
      await updateSettings(update);
      
      toast.success("Setting updated successfully");
    } catch (error) {
      console.error("Failed to update setting:", error);
      toast.error("Failed to update setting");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AccordionItem value="transition-config">
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
            label="Transition Duration"
            type="slider"
            value={parseFloat(form.watch("transition_duration")?.replace('s', '') || '0.3')}
            min={0.1}
            max={1}
            step={0.1}
            onChange={(value) => handleValueChange("transition_duration", `${value}s`)}
            description="Duration of transition animations"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <CSSEffectsControl
            label="Hover Scale"
            type="slider"
            value={parseFloat(form.watch("hover_scale") || '1.05')}
            min={1}
            max={1.2}
            step={0.01}
            onChange={(value) => handleValueChange("hover_scale", value.toString())}
            description="Scale factor for hover animations"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <CSSEffectsControl
            label="Transition Type"
            type="select"
            value={form.watch("transition_type") || 'fade'}
            options={[
              { label: "Fade", value: "fade" },
              { label: "Slide", value: "slide" },
              { label: "Scale", value: "scale" }
            ]}
            onChange={(value) => handleValueChange("transition_type", value)}
            description="Type of transition animation"
          />
        </motion.div>

        <Card className="p-4 bg-gray-800/50 border border-gray-700">
          <h3 className="text-sm font-medium mb-2">Preview</h3>
          <motion.div
            className="bg-gray-700/50 p-4 rounded-md flex items-center justify-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: parseFloat(form.watch("transition_duration")?.replace('s', '') || '0.3'),
              ease: form.watch("transition_type") === "linear" ? "linear" : "easeOut"
            }}
          >
            Hover over me
          </motion.div>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};
