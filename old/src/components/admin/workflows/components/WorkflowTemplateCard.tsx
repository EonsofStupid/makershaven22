import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Edit, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import type { WorkflowTemplate } from '@/lib/types/workflow/types';

interface WorkflowTemplateCardProps {
  template: WorkflowTemplate;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const WorkflowTemplateCard = ({ template, onEdit, onDelete }: WorkflowTemplateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="p-6 bg-black/40 backdrop-blur-xl border-white/10 hover:border-neon-cyan/50 transition-all duration-300">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-white">{template.name}</h3>
              {template.is_active ? (
                <span className="flex items-center text-xs text-green-400">
                  <Check className="w-3 h-3 mr-1" />
                  Active
                </span>
              ) : (
                <span className="flex items-center text-xs text-red-400">
                  <X className="w-3 h-3 mr-1" />
                  Inactive
                </span>
              )}
            </div>
            <p className="text-white/60 mt-1">{template.description}</p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-white/40">
                {template.stages?.length || 0} stages
              </span>
              <span className="text-white/20">•</span>
              <span className="text-sm text-white/40">
                Created {new Date(template.created_at || '').toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(template.id)}
              className="text-white/60 hover:text-white hover:bg-white/5"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(template.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
