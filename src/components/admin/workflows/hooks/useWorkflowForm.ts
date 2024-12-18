import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { WorkflowTemplate, WorkflowStage, serializeWorkflowTemplate } from '@/integrations/supabase/types';
import { toast } from 'sonner';

export const useWorkflowForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<WorkflowTemplate>({
    defaultValues: {
      name: '',
      description: '',
      stages: [],
      steps: [],
      is_active: true
    }
  });

  const handleWorkflowUpdate = async (formData: WorkflowTemplate) => {
    setIsSaving(true);
    try {
      const serializedData = serializeWorkflowTemplate(formData);
      
      const { error } = await supabase
        .from('workflow_templates')
        .insert([serializedData]);

      if (error) throw error;
      toast.success('Workflow template saved successfully');
    } catch (error) {
      console.error('Error saving workflow template:', error);
      toast.error('Failed to save workflow template');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    form,
    isLoading,
    isSaving,
    handleWorkflowUpdate
  };
};