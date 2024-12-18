import React from 'react';
import { useWorkflowStore } from '@/lib/store/workflow-store';
import { WorkflowTemplateList } from './WorkflowTemplateList';
import { WorkflowTemplateForm } from './WorkflowTemplateForm';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WorkflowManagement = () => {
  const navigate = useNavigate();
  const { templates, isLoading, error, fetchTemplates } = useWorkflowStore();

  React.useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleCreateNew = () => {
    navigate('/admin/workflows/templates/new');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Workflow Templates</h2>
        <Button
          onClick={handleCreateNew}
          className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      <Card className="bg-black/40 backdrop-blur-xl border-white/10 p-6">
        <WorkflowTemplateList />
      </Card>
    </div>
  );
};