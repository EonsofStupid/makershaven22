
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { WorkflowFormData, serializeWorkflowStages } from '@/lib/types/workflow/types';
import { useState } from 'react';

export const useWorkflowForm = () => {
  const form = useForm<WorkflowFormData>();
  const [isNewTemplate, setIsNewTemplate] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const handleSave = async (workflow: WorkflowFormData) => {
    try {
      setIsPending(true);
      
      // Convert stages to JSON-compatible format for Supabase
      const workflowData = {
        name: workflow.name,
        description: workflow.description || null,
        steps: workflow.steps ? serializeWorkflowStages(workflow.steps) : [],
        stages: workflow.stages ? serializeWorkflowStages(workflow.stages) : [],
        is_active: workflow.is_active ?? true
      };

      const { data, error } = await supabase
        .from('cms_workflows')
        .insert(workflowData)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving workflow:', error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { form, handleSave, isNewTemplate, isPending };
};
