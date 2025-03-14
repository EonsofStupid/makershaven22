
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useSettingsStore } from '@/lib/store/settings-store';
import { toast } from 'sonner';

export const TransformationRuleEditor = () => {
  const { settings, updateSettings } = useSettingsStore();
  const [rules, setRules] = useState<Array<{ from: string; to: string }>>([]);
  const [newRule, setNewRule] = useState({ from: '', to: '' });

  // Initialize from stored settings metadata
  useEffect(() => {
    if (settings.metadata?.transformationRules) {
      const storedRules = settings.metadata.transformationRules;
      if (Array.isArray(storedRules)) {
        setRules(storedRules as { from: string; to: string }[]);
      }
    }
  }, [settings.metadata]);

  const handleAddRule = () => {
    if (!newRule.from || !newRule.to) {
      toast.error("Both 'from' and 'to' fields are required");
      return;
    }

    const updatedRules = [...rules, newRule];
    setRules(updatedRules);
    setNewRule({ from: '', to: '' });
    
    // Save to settings metadata
    const updatedMetadata = {
      ...settings.metadata,
      transformationRules: updatedRules
    };
    
    updateSettings({ metadata: updatedMetadata });
    toast.success("Transformation rule added");
  };

  const handleDeleteRule = (index: number) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
    
    // Save to settings metadata
    const updatedMetadata = {
      ...settings.metadata,
      transformationRules: updatedRules
    };
    
    updateSettings({ metadata: updatedMetadata });
    toast.success("Transformation rule deleted");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Transformation Rules</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="from">From</Label>
          <Input 
            id="from"
            value={newRule.from}
            onChange={(e) => setNewRule(prev => ({ ...prev, from: e.target.value }))}
            placeholder="Original value" 
          />
        </div>
        <div>
          <Label htmlFor="to">To</Label>
          <Input 
            id="to"
            value={newRule.to}
            onChange={(e) => setNewRule(prev => ({ ...prev, to: e.target.value }))}
            placeholder="Transformed value" 
          />
        </div>
      </div>
      
      <Button onClick={handleAddRule} className="w-full">Add Rule</Button>
      
      <div className="space-y-2 mt-4">
        {rules.map((rule, index) => (
          <Card key={index} className="p-3 flex justify-between items-center bg-gray-800">
            <span>
              <span className="text-green-400">{rule.from}</span> → <span className="text-blue-400">{rule.to}</span>
            </span>
            <Button variant="destructive" size="sm" onClick={() => handleDeleteRule(index)}>Delete</Button>
          </Card>
        ))}
        {rules.length === 0 && (
          <p className="text-gray-400 text-center py-2">No transformation rules defined</p>
        )}
      </div>
    </div>
  );
};
