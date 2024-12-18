import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { WorkflowFormData, WorkflowTemplate } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useWorkflowForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<WorkflowFormData>({
    defaultValues: {
      name: '',
      description: '',
      stages: [],
      is_active: true
    }
  });

  const handleWorkflowUpdate = async (formData: WorkflowFormData) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('workflow_templates')
        .insert([{
          name: formData.name,
          description: formData.description,
          stages: formData.stages,
          is_active: formData.is_active,
          steps: formData.stages // For backward compatibility
        }]);

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