import React from 'react';
import { Card } from "@/components/ui/card";
import { Json } from '@/lib/types/core/json';
import { Settings } from '@/lib/types/settings';

const InterfaceSettingsCard: React.FC<{ settings: Settings; onChange: (updatedSettings: Settings) => void }> = ({ settings, onChange }) => {
  const handleSettingChange = (key: keyof Settings, value: any) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10">
      <h3 className="text-lg font-semibold text-white">Interface Settings</h3>
      <div className="mt-4">
        <label className="block text-white mb-2">Site Title</label>
        <input
          type="text"
          value={settings.site_title}
          onChange={(e) => handleSettingChange('site_title', e.target.value)}
          className="bg-white/5 border border-white/10 text-white p-2 rounded"
        />
      </div>
      <div className="mt-4">
        <label className="block text-white mb-2">Tagline</label>
        <input
          type="text"
          value={settings.tagline}
          onChange={(e) => handleSettingChange('tagline', e.target.value)}
          className="bg-white/5 border border-white/10 text-white p-2 rounded"
        />
      </div>
      {/* Add more settings fields as needed */}
    </Card>
  );
};

export default InterfaceSettingsCard;
