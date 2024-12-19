import React from 'react';
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SettingValue } from '@/lib/types/database/core/json';
import { Settings } from '@/lib/types/settings/types';

interface ImportSettingsProps {
  settings: Record<string, SettingValue>;
  onSettingChange: (key: keyof Settings, value: boolean) => void;
}

const ImportSettingsCard: React.FC<ImportSettingsProps> = ({ settings, onSettingChange }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Import Settings</h3>
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

export default ImportSettingsCard;