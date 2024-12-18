import React from 'react';
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SettingValue } from '@/integrations/supabase/types/core/json';
import { Settings } from '@/integrations/supabase/types/settings/types';

interface InterfaceSettingsProps {
  settings: Record<string, SettingValue>;
  onSettingChange: (key: keyof Settings, value: boolean) => void;
}

const InterfaceSettingsCard: React.FC<InterfaceSettingsProps> = ({ settings, onSettingChange }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Interface Settings</h3>
      <div className="space-y-4">
        {Object.entries(settings).map(([key, setting]) => (
          <div key={key} className="flex items-center justify-between">
            <label className="text-sm font-medium">{setting.label}</label>
            <Switch
              checked={setting.value}
              onCheckedChange={(checked) => onSettingChange(key as keyof Settings, checked)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InterfaceSettingsCard;