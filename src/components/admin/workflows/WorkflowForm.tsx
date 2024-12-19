import React from 'react';
import { useForm } from 'react-hook-form';
import { WorkflowFormData, WorkflowTemplate } from '@/lib/types/workflow/types';
import { StagesManager } from './components/StagesManager';
import { WorkflowFormHeader } from './components/WorkflowFormHeader';

const WorkflowForm: React.FC<{ workflow?: WorkflowTemplate; onSave: (data: WorkflowFormData) => void }> = ({ workflow, onSave }) => {
  const { register, handleSubmit, setValue } = useForm<WorkflowFormData>({
    defaultValues: workflow || {
      id: '',
      name: '',
      description: '',
      steps: [],
      stages: [],
      is_active: true,
      created_by: '',
      created_at: '',
      updated_at: '',
    },
  });

  const onSubmit = (data: WorkflowFormData) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <WorkflowFormHeader register={register} />
      <StagesManager stages={workflow?.stages || []} onChange={(stages) => setValue('stages', stages)} />
      <button type="submit" className="btn btn-primary">
        Save Workflow
      </button>
    </form>
  );
};

export default WorkflowForm;
