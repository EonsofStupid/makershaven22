import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface WorkflowBasicInfoProps {
  name: string;
  description: string;
  isActive: boolean;
  onChange: (field: string, value: any) => void;
}

export const WorkflowBasicInfo = ({
  name,
  description,
  isActive,
  onChange,
}: WorkflowBasicInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-white">Template Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Enter template name"
          className="bg-white/5 border-white/10 text-white mt-2"
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-white">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Enter template description"
          className="bg-white/5 border-white/10 text-white mt-2"
          rows={4}
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={isActive}
          onCheckedChange={(checked) => onChange('is_active', checked)}
        />
        <Label className="text-white">Active Template</Label>
      </div>
    </div>
  );
};