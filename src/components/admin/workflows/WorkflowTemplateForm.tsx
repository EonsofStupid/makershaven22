import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { WorkflowTemplate, WorkflowFormData, serializeStages, parseStages, validateStage } from "./types";
import { useSettingsForm } from "./hooks/useSettingsForm";
import { useTheme } from "@/components/theme/ThemeContext";
import { SettingsPreview } from "./components/SettingsPreview";
import { ResetDialog } from "./components/ResetDialog";
import { SettingsFormHeader } from "./components/SettingsFormHeader";
import { SavingIndicator } from "./components/SavingIndicator";
import { WorkflowBasicFields } from './components/WorkflowBasicFields';
import { VisualWorkflowBuilder } from './components/VisualWorkflowBuilder';
import { toast } from "sonner";

export const WorkflowTemplateForm = () => {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { theme, updateTheme } = useTheme();

  const {
    settings,
    isLoading,
    isSaving,
    handleSettingsUpdate,
    handleResetToDefault,
  } = useSettingsForm();

  const form = useForm<WorkflowFormData>({
    defaultValues: {
      name: '',
      description: '',
      stages: [],
      is_active: true
    }
  });

  const handleSubmit = async (data: WorkflowFormData) => {
    try {
      const serializedStages = serializeStages(data.stages);
      const templateData = {
        ...data,
        steps: serializedStages
      };
      
      await handleSettingsUpdate(templateData);
      toast.success('Workflow template saved successfully');
    } catch (error) {
      console.error('Error saving workflow template:', error);
      toast.error('Failed to save workflow template');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-[5%] min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <Card className="p-6 bg-gray-800/50 border border-white/10 backdrop-blur-sm">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <WorkflowBasicFields
              name={form.watch('name')}
              description={form.watch('description')}
              isActive={form.watch('is_active')}
              onChange={(field, value) => form.setValue(field as any, value)}
            />
            
            <div className="border-t border-white/10 pt-6">
              <VisualWorkflowBuilder
                stages={form.watch('stages')}
                onChange={(stages) => form.setValue('stages', stages)}
              />
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};