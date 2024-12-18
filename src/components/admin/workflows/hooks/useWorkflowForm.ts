import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook for managing workflow forms.
 */
export const useWorkflowForm = () => {
  const form = useForm();

  const handleSave = async (workflow) => {
    try {
      const { data, error } = await supabase.from('cms_workflows').insert(workflow).single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving workflow:', error);
      throw error;
    }
  };

  return { form, handleSave };
};