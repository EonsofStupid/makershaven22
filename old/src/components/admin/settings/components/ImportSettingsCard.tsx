
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useSettingsStore } from '@/lib/store/settings-store';
import { FlattenedSettings } from '@/lib/types/settings/types';

export const ImportSettingsCard = () => {
  const { updateSettings } = useSettingsStore();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const settings: FlattenedSettings = JSON.parse(text);
      
      await updateSettings(settings);
      toast.success('Settings imported successfully');
    } catch (error) {
      console.error('Error importing settings:', error);
      toast.error('Failed to import settings. Please check the file format.');
    }
  };

  return (
    <Card className="p-6 space-y-4 bg-gray-800/50 border border-white/10">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Import Settings</h3>
          <p className="text-sm text-gray-400">Import settings from a JSON file</p>
        </div>
        <AlertCircle className="w-5 h-5 text-yellow-500" />
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="settingsFile">Settings File</Label>
          <Input
            id="settingsFile"
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => document.getElementById('settingsFile')?.click()}
            className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Settings
          </Button>
        </div>
      </div>
    </Card>
  );
};
