import React from 'react';
import { Card } from "@/components/ui/card";
import { StageConfigUpdateProps, WorkflowStageType } from '@/lib/types/workflow/types';
import { ApprovalConfig } from './config/ApprovalConfig';
import { ReviewConfig } from './config/ReviewConfig';
import { TaskConfig } from './config/TaskConfig';
import { NotificationConfig } from './config/NotificationConfig';

const StageConfigPanel: React.FC<StageConfigUpdateProps> = ({ config, onChange }) => {
  const handleConfigChange = (updatedConfig: Partial<WorkflowStageType>) => {
    onChange({ ...config, ...updatedConfig });
  };

  return (
    <Card className="p-4 bg-gray-800/50 border border-white/10">
      <h3 className="text-lg font-semibold text-white">Stage Configuration</h3>
      {config.type === 'approval' && (
        <ApprovalConfig config={config} onChange={handleConfigChange} />
      )}
      {config.type === 'review' && (
        <ReviewConfig config={config} onChange={handleConfigChange} />
      )}
      {config.type === 'task' && (
        <TaskConfig config={config} onChange={handleConfigChange} />
      )}
      {config.type === 'notification' && (
        <NotificationConfig config={config} onChange={handleConfigChange} />
      )}
    </Card>
  );
};

export default StageConfigPanel;
