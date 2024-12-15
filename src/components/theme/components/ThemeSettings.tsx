import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from '../hooks/useTheme';
import { toast } from 'sonner';

export const ThemeSettings = () => {
  const { mode, setMode } = useTheme();

  const handleModeChange = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
    toast.success(`Theme mode changed to ${newMode}`);
  };

  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Theme Settings</h3>
        <RadioGroup
          value={mode}
          onValueChange={handleModeChange}
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <RadioGroupItem
              value="light"
              id="light"
              className="peer sr-only"
            />
            <Label
              htmlFor="light"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span>Light</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="dark"
              id="dark"
              className="peer sr-only"
            />
            <Label
              htmlFor="dark"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span>Dark</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="system"
              id="system"
              className="peer sr-only"
            />
            <Label
              htmlFor="system"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span>System</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </Card>
  );
};