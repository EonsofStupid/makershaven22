
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CSSEffectsControl } from "../../components/CSSEffectsControl";
import { useSettingsStore } from "@/lib/store/settings-store";

export const AnimationsSection = ({ form }) => {
  return (
    <AccordionItem value="animations">
      <AccordionTrigger className="text-lg font-semibold text-white">
        <motion.div
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.02 }}
          className="flex items-center gap-2"
        >
          Animations & Effects
        </motion.div>
      </AccordionTrigger>
      <AccordionContent className="space-y-6 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CSSEffectsControl
            label="Menu Animation Type"
            type="select"
            value={form.watch("menu_animation_type") || 'fade'}
            options={[
              { label: "Fade", value: "fade" },
              { label: "Slide", value: "slide" },
              { label: "Scale", value: "scale" }
            ]}
            onChange={(value) => form.setValue("menu_animation_type", value)}
            description="Animation type for menu elements"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <CSSEffectsControl
            label="Backdrop Blur"
            type="slider"
            value={parseFloat(form.watch("backdrop_blur")?.replace('px', '') || '0')}
            min={0}
            max={20}
            step={1}
            onChange={(value) => form.setValue("backdrop_blur", `${value}px`)}
            description="Blur amount for backdrop effects"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <CSSEffectsControl
            label="Box Shadow"
            type="select"
            value={form.watch("box_shadow") || 'none'}
            options={[
              { label: "None", value: "none" },
              { label: "Small", value: "0 2px 4px rgba(0,0,0,0.1)" },
              { label: "Medium", value: "0 4px 8px rgba(0,0,0,0.12)" },
              { label: "Large", value: "0 10px 15px rgba(0,0,0,0.15)" },
              { label: "Neon Glow", value: "0 0 10px var(--neon-cyan), 0 0 20px var(--neon-pink)" }
            ]}
            onChange={(value) => form.setValue("box_shadow", value)}
            description="Shadow style for elements"
          />
        </motion.div>

        <Card className="p-4 bg-gray-800/50 border border-gray-700">
          <h3 className="text-sm font-medium mb-2">Animation Preview</h3>
          <div className="relative h-32 bg-gray-700/30 rounded-md overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
              animate={{ 
                backdropFilter: `blur(${form.watch("backdrop_blur")?.replace('px', '') || '0'}px)`,
                boxShadow: form.watch("box_shadow") || 'none'
              }}
            />
            
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-md absolute"
              initial={{ x: 10, y: 10 }}
              animate={{ 
                x: 100, 
                transition: { 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut" 
                }
              }}
              style={{
                boxShadow: form.watch("box_shadow") || 'none'
              }}
            />
          </div>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};
