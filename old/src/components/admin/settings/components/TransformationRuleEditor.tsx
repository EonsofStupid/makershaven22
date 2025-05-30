
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useSettingsStore } from '@/lib/store/settings-store';
import { toast } from 'sonner';
import { Json, JsonObject, isJson } from '@/lib/types/core/json';

// Define the TransformationRule interface with index signature
export interface TransformationRule {
  from: string;
  to: string;
  [key: string]: string;
}

export const TransformationRuleEditor = () => {
  const { settings, updateSettings } = useSettingsStore();
  const [rules, setRules] = useState<TransformationRule[]>([]);
  const [newRule, setNewRule] = useState<TransformationRule>({ from: '', to: '' });

  // Initialize from stored settings metadata
  useEffect(() => {
    if (settings.metadata?.transformationRules) {
      try {
        const storedRules = settings.metadata.transformationRules;
        if (Array.isArray(storedRules)) {
          // Transform the JSON array into TransformationRule[]
          const validRules = storedRules
            .filter(rule => typeof rule === 'object' && rule !== null)
            .map(rule => {
              const typedRule = rule as Record<string, unknown>;
              // Only include rules with proper from/to as strings
              if (typeof typedRule.from === 'string' && typeof typedRule.to === 'string') {
                return { from: typedRule.from, to: typedRule.to } as TransformationRule;
              }
              return null;
            })
            .filter(Boolean) as TransformationRule[];
            
          setRules(validRules);
        }
      } catch (e) {
        console.error("Error parsing transformation rules:", e);
        setRules([]);
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
    
    // Convert rules to JSON format for metadata storage
    const updatedMetadata: JsonObject = {
      ...settings.metadata,
      transformationRules: updatedRules as unknown as Json
    };
    
    updateSettings({ metadata: updatedMetadata });
    toast.success("Transformation rule added");
  };

  const handleDeleteRule = (index: number) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
    
    // Convert rules to JSON format for metadata storage
    const updatedMetadata: JsonObject = {
      ...settings.metadata,
      transformationRules: updatedRules as unknown as Json
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
