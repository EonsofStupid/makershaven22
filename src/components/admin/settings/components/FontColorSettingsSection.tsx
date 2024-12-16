import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ColorPicker } from "./ColorPicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/theme/hooks/useTheme";
import { toast } from "sonner";
import type { Settings } from "@/lib/types/settings";

export const FontColorSettingsSection = () => {
  const { settings, updateSettings } = useTheme();

  const handleColorChange = async (key: keyof Settings, value: string) => {
    try {
      if (!settings) return;
      await updateSettings({ ...settings, [key]: value });
      toast.success("Color updated successfully");
    } catch (error) {
      console.error("Error updating color:", error);
      toast.error("Failed to update color");
    }
  };

  if (!settings) return null;

  return (
    <AccordionItem value="font-colors">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Font Colors
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Text Colors</TabsTrigger>
            <TabsTrigger value="neon">Neon Effects</TabsTrigger>
            <TabsTrigger value="brand">Brand Colors</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4 mt-4">
            <ColorPicker
              label="Primary Text"
              cssVar="--foreground"
              value={settings.text_primary_color}
              onChange={(color) => handleColorChange("text_primary_color", color)}
            />
            <ColorPicker
              label="Secondary Text"
              cssVar="--muted-foreground"
              value={settings.text_secondary_color}
              onChange={(color) => handleColorChange("text_secondary_color", color)}
            />
            <ColorPicker
              label="Link Text"
              cssVar="--link"
              value={settings.text_link_color}
              onChange={(color) => handleColorChange("text_link_color", color)}
            />
            <ColorPicker
              label="Heading Text"
              cssVar="--heading"
              value={settings.text_heading_color}
              onChange={(color) => handleColorChange("text_heading_color", color)}
            />
          </TabsContent>

          <TabsContent value="neon" className="space-y-4 mt-4">
            <ColorPicker
              label="Neon Cyan"
              cssVar="--neon-cyan"
              value={settings.neon_cyan || '#41f0db'}
              onChange={(color) => handleColorChange("neon_cyan", color)}
            />
            <ColorPicker
              label="Neon Pink"
              cssVar="--neon-pink"
              value={settings.neon_pink || '#ff0abe'}
              onChange={(color) => handleColorChange("neon_pink", color)}
            />
            <ColorPicker
              label="Neon Purple"
              cssVar="--neon-purple"
              value={settings.neon_purple || '#8000ff'}
              onChange={(color) => handleColorChange("neon_purple", color)}
            />
          </TabsContent>

          <TabsContent value="brand" className="space-y-4 mt-4">
            <ColorPicker
              label="Primary Color"
              cssVar="--primary"
              value={settings.primary_color}
              onChange={(color) => handleColorChange("primary_color", color)}
            />
            <ColorPicker
              label="Secondary Color"
              cssVar="--secondary"
              value={settings.secondary_color}
              onChange={(color) => handleColorChange("secondary_color", color)}
            />
            <ColorPicker
              label="Accent Color"
              cssVar="--accent"
              value={settings.accent_color}
              onChange={(color) => handleColorChange("accent_color", color)}
            />
          </TabsContent>
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
};