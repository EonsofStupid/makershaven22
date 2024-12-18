import React from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useSettingsStore } from '@/lib/store/settings-store';

const DatabaseSettingsCard = () => {
  const { settings, updateSetting } = useSettingsStore();

  return (
    <Card>
      <h3>Database Settings</h3>
      {Object.entries(settings).map(([key, { label, value }]) => (
        <div key={key}>
          <label>{label}</label>
          <Switch
            checked={value}
            onChange={(checked) => updateSetting(key, checked)}
          />
        </div>
      ))}
    </Card>
  );
};

export default DatabaseSettingsCard;