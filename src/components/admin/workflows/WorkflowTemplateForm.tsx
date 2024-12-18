import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { WorkflowFormHeader } from './components/form/WorkflowFormHeader';
import { WorkflowBasicInfo } from './components/form/WorkflowBasicInfo';
import { VisualWorkflowBuilder } from './components/VisualWorkflowBuilder';
import { WorkflowTemplate, WorkflowStage } from '@/integrations/supabase/types';
import { parseStages } from '@/integrations/supabase/types/workflow';

export const WorkflowTemplateForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isNewTemplate = !id;

  const [formData, setFormData] = useState<WorkflowTemplate>({
    id: '',
    name: '',
    description: '',
    steps: [],
    is_active: true,
    created_by: '',
    created_at: '',
    updated_at: ''
  });

  const { data: template, isLoading } = useQuery({
    queryKey: ['workflow-template', id],
    queryFn: async () => {
      if (isNewTemplate) return null;
      
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching template:', error);
        toast.error('Failed to fetch template');
        throw error;
      }
      
      return data;
    },
    enabled: !isNewTemplate
  });

  useEffect(() => {
    if (template) {
      setFormData({
        ...template,
        stages: template.stages || []
      });
    }
  }, [template]);

  const mutation = useMutation({
    mutationFn: async (data: WorkflowTemplate) => {
      const templateData = {
        name: data.name,
        description: data.description,
        steps: parseStages(data.steps),
        is_active: data.is_active
      };

      if (isNewTemplate) {
        const { data: newTemplate, error } = await supabase
          .from('workflow_templates')
          .insert([templateData])
          .select()
          .single();

        if (error) throw error;
        return newTemplate;
      } else {
        const { data: updatedTemplate, error } = await supabase
          .from('workflow_templates')
          .update(templateData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return updatedTemplate;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow-templates'] });
      toast.success(`Template ${isNewTemplate ? 'created' : 'updated'} successfully`);
    },
    onError: (error) => {
      console.error('Error saving template:', error);
      toast.error(`Failed to ${isNewTemplate ? 'create' : 'update'} template`);
    }
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error('Template name is required');
      return;
    }
    mutation.mutate(formData);
  };

  if (!isNewTemplate && isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <WorkflowFormHeader 
        isNewTemplate={isNewTemplate}
        isPending={mutation.isPending}
        onSubmit={handleSubmit}
      />

      <div className="space-y-8">
        <WorkflowBasicInfo
          name={formData.name}
          description={formData.description}
          isActive={formData.is_active}
          onChange={handleFieldChange}
        />

        <div className="border-t border-white/10 pt-6">
          <VisualWorkflowBuilder
            stages={formData.steps}
            onChange={(stages) => handleFieldChange('steps', stages)}
          />
        </div>
      </div>
    </div>
  );
};
