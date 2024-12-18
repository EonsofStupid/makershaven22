import React from 'react';
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { DatabaseSettings } from '@/integrations/supabase/types/core/json';
import { Settings } from '@/integrations/supabase/types/settings/types';

interface ImportSettingsProps {
  settings: DatabaseSettings;
  onSettingChange: (key: keyof Settings, value: boolean) => void;
}

const ImportSettingsCard: React.FC<ImportSettingsProps> = ({ settings, onSettingChange }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Import Settings</h3>
      <div className="space-y-4">
        {Object.entries(settings).map(([key, { label, value }]) => (
          <div key={key} className="flex items-center justify-between">
            <label className="text-sm font-medium">{label}</label>
            <Switch
              checked={value}
              onCheckedChange={(checked) => onSettingChange(key as keyof Settings, checked)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ImportSettingsCard;