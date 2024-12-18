import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSettingsStore } from '@/lib/store/settings-store';
import { toast } from 'sonner';

const TransformationRuleEditor = () => {
  const { saveTransformationRule } = useSettingsStore();
  const [rule, setRule] = useState({ name: '', type: '', config: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!rule.name || !rule.type) {
      toast.error('Rule name and type are required.');
      return;
    }

    try {
      setIsSaving(true);
      await saveTransformationRule(rule);
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
    <Card>
      <h3>Transformation Rule Editor</h3>
      <div>
        <label>Rule Name</label>
        <Input value={rule.name} onChange={(e) => setRule({ ...rule, name: e.target.value })} />

        <label>Rule Type</label>
        <Input value={rule.type} onChange={(e) => setRule({ ...rule, type: e.target.value })} />

        <label>Configuration</label>
        <Textarea value={rule.config} onChange={(e) => setRule({ ...rule, config: e.target.value })} />

        <button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Rule'}
        </button>
      </div>
    </Card>
  );
};

export default TransformationRuleEditor;