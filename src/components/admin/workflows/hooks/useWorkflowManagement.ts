
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { parseWorkflowStage, serializeWorkflowStage, WorkflowStage } from '@/lib/types/workflow/stage';
import { Json } from '@/lib/types/core/json';

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  steps: Json; // Will be parsed into WorkflowSteps
  stages: Json; // Will be parsed into WorkflowStage[]
  is_active: boolean;
  created_by: string;
  updated_at: string;
  email?: string;
  triggers?: Json;
  created_at?: string;
}

interface ApiResponse<T> {
  data: T[] | null;
  error: Error | null;
}

export const useWorkflowManagement = () => {
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadTemplates = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .order('name');

      if (error) throw error;

      // Add created_at if missing
      const templatesWithCreatedAt = data.map((template: any) => ({
        ...template,
        created_at: template.created_at || new Date().toISOString()
      }));

      setTemplates(templatesWithCreatedAt as WorkflowTemplate[]);
    } catch (err) {
      console.error('Error loading workflow templates:', err);
      setError(err as Error);
      toast.error('Failed to load workflow templates');
    } finally {
      setIsLoading(false);
    }
  };

  const createTemplate = async (template: Partial<WorkflowTemplate>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Ensure stages is serialized as JSON
      let serializedStages: Json = [];
      if (Array.isArray(template.stages)) {
        serializedStages = template.stages.map(stage => 
          typeof stage === 'object' ? serializeWorkflowStage(stage as WorkflowStage) : stage
        );
      }

      const { data, error } = await supabase
        .from('workflow_templates')
        .insert([
          {
            name: template.name,
            description: template.description,
            steps: template.steps || [],
            stages: serializedStages,
            is_active: template.is_active !== undefined ? template.is_active : true,
            created_by: template.created_by
          }
        ])
        .select();

      if (error) throw error;

      toast.success('Workflow template created successfully');
      return data?.[0] as WorkflowTemplate;
    } catch (err) {
      console.error('Error creating workflow template:', err);
      setError(err as Error);
      toast.error('Failed to create workflow template');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTemplate = async (id: string, template: Partial<WorkflowTemplate>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Ensure stages is serialized as JSON
      let serializedStages: Json = [];
      if (Array.isArray(template.stages)) {
        serializedStages = template.stages.map(stage => 
          typeof stage === 'object' ? serializeWorkflowStage(stage as WorkflowStage) : stage
        );
      }

      const { data, error } = await supabase
        .from('workflow_templates')
        .update({
          name: template.name,
          description: template.description,
          steps: template.steps,
          stages: serializedStages,
          is_active: template.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) throw error;

      toast.success('Workflow template updated successfully');
      await loadTemplates();
      return data?.[0] as WorkflowTemplate;
    } catch (err) {
      console.error('Error updating workflow template:', err);
      setError(err as Error);
      toast.error('Failed to update workflow template');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTemplate = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('workflow_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Workflow template deleted successfully');
      setTemplates(templates.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting workflow template:', err);
      setError(err as Error);
      toast.error('Failed to delete workflow template');
    } finally {
      setIsLoading(false);
    }
  };

  const getTemplateById = async (id: string): Promise<WorkflowTemplate | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      // Parse stages from JSON to WorkflowStage objects
      let parsedTemplate = { ...data };
      if (data.stages) {
        try {
          if (Array.isArray(data.stages)) {
            parsedTemplate.stages = data.stages;
          }
        } catch (parseError) {
          console.error('Error parsing workflow stages:', parseError);
        }
      }

      return parsedTemplate as WorkflowTemplate;
    } catch (err) {
      console.error('Error getting workflow template:', err);
      setError(err as Error);
      toast.error('Failed to load workflow template');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    templates,
    isLoading,
    error,
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateById
  };
};
