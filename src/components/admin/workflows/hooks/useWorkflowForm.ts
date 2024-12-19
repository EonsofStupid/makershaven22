import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { WorkflowFormData } from '@/lib/types/workflow/types';

export const useWorkflowForm = () => {
  const form = useForm<WorkflowFormData>();
  const isNewTemplate = true;
  const isPending = false;

  const handleSave = async (workflow: WorkflowFormData) => {
    try {
      const { data, error } = await supabase.from('cms_workflows').insert(workflow).single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving workflow:', error);
      throw error;
    }
  };

  return { form, handleSave, isNewTemplate, isPending };
};