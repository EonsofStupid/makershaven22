import React from 'react';
import { useForm } from 'react-hook-form';
import { Card } from "@/components/ui/card";
import { WorkflowFormData, WorkflowTemplate } from '@/lib/types/workflow/types';
import { StagesManager } from './components/StagesManager';
import { WorkflowFormHeader } from './components/WorkflowFormHeader';
import { useWorkflowForm } from './hooks/useWorkflowForm';

const WorkflowTemplateForm: React.FC = () => {
  const { form, handleSave, isNewTemplate, isPending } = useWorkflowForm();

  const onSubmit = async (data: WorkflowFormData) => {
    await handleSave(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card className="p-6 bg-gray-800/50 border border-white/10">
        <WorkflowFormHeader 
          isNewTemplate={isNewTemplate}
          isPending={isPending}
          onSubmit={form.handleSubmit(onSubmit)}
        />
        <StagesManager 
          stages={form.watch("stages") || []} 
          onChange={(stages) => form.setValue('stages', stages)} 
        />
      </Card>
    </form>
  );
};

export default WorkflowTemplateForm;