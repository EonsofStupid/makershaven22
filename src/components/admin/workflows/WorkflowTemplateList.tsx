import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { WorkflowTemplateCard } from './components/WorkflowTemplateCard';
import { useNavigate } from 'react-router-dom';
import { parseStages } from './types';
import type { WorkflowTemplate } from './types';

export const WorkflowTemplateList = () => {
  const navigate = useNavigate();

  const { data: templates, isLoading, error } = useQuery({
    queryKey: ['workflow-templates'],
    queryFn: async () => {
      console.log('Fetching workflow templates...');
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching templates:', error);
        throw error;
      }

      // Convert the database response to WorkflowTemplate type
      return (data || []).map(template => ({
        ...template,
        stages: parseStages(template.steps),
        is_active: template.is_active ?? true
      })) as WorkflowTemplate[];
    }
  });

  const handleCreateTemplate = () => {
    navigate('/admin/workflows/templates/new');
  };

  const handleEditTemplate = (id: string) => {
    navigate(`/admin/workflows/templates/${id}`);
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('workflow_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Template deleted successfully');
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template');
    }
  };

  if (error) {
    toast.error('Failed to load workflow templates');
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Workflow Templates</h2>
        <Button 
          onClick={handleCreateTemplate}
          className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : templates?.length === 0 ? (
        <Card className="p-8 text-center bg-black/40 border-white/10">
          <p className="text-white/60">No workflow templates found</p>
          <p className="text-sm text-white/40 mt-2">Create a template to get started</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {templates?.map((template) => (
            <WorkflowTemplateCard
              key={template.id}
              template={template}
              onEdit={handleEditTemplate}
              onDelete={handleDeleteTemplate}
            />
          ))}
        </div>
      )}
    </div>
  );
};