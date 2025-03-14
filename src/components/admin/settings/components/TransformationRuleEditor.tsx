
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSettingsStore } from '@/lib/store/settings-store';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const TransformationRuleEditor = () => {
  const settingsStore = useSettingsStore();
  const [rule, setRule] = useState({ name: '', type: '', config: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!rule.name || !rule.type) {
      toast.error('Rule name and type are required.');
      return;
    }

    try {
      setIsSaving(true);
      // Get the current metadata or initialize an empty object
      const currentMetadata = settingsStore.settings.metadata || {};
      
      // Get the current transformation rules array or initialize an empty array
      const currentRules = Array.isArray(currentMetadata.transformationRules) 
        ? [...currentMetadata.transformationRules] 
        : [];
      
      // Add the new rule
      const updatedRules = [...currentRules, rule];
      
      // Update settings with the new metadata
      await settingsStore.updateSettings({
        metadata: {
          ...currentMetadata,
          transformationRules: updatedRules
        }
      });
      
      toast.success('Transformation rule saved successfully.');
      setRule({ name: '', type: '', config: '' });
    } catch (error) {
      console.error('Error saving rule:', error);
      toast.error('Failed to save transformation rule.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Transformation Rules</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Rule Name</label>
          <Input 
            value={rule.name} 
            onChange={(e) => setRule({ ...rule, name: e.target.value })} 
            placeholder="Enter rule name"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Rule Type</label>
          <Input 
            value={rule.type} 
            onChange={(e) => setRule({ ...rule, type: e.target.value })} 
            placeholder="E.g., format, validation, transformation"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Configuration</label>
          <Textarea 
            value={rule.config} 
            onChange={(e) => setRule({ ...rule, config: e.target.value })} 
            placeholder="JSON configuration or rule definition"
            rows={5}
          />
        </div>
        
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full"
        >
          {isSaving ? 'Saving...' : 'Save Rule'}
        </Button>
      </div>
    </Card>
  );
};

export default TransformationRuleEditor;
