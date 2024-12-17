import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { WorkflowStageType } from '../../types';

interface StageTypeSelectorProps {
  value: WorkflowStageType;
  onChange: (value: WorkflowStageType) => void;
}

export const StageTypeSelector = ({ value, onChange }: StageTypeSelectorProps) => {
  const stageTypes: { value: WorkflowStageType; label: string }[] = [
    { value: 'APPROVAL', label: 'Approval' },
    { value: 'REVIEW', label: 'Review' },
    { value: 'TASK', label: 'Task' },
    { value: 'NOTIFICATION', label: 'Notification' },
    { value: 'CONDITIONAL', label: 'Conditional' },
  ];

  return (
    <Select value={value} onValueChange={onChange as (value: string) => void}>
      <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
        <SelectValue placeholder="Select stage type" />
      </SelectTrigger>
      <SelectContent>
        {stageTypes.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};