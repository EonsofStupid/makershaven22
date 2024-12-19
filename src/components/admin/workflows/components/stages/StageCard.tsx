import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { WorkflowStage, StageUpdateFunction } from '@/lib/types/workflow/types';

interface StageCardProps {
  stage: WorkflowStage;
  index: number;
  onUpdate: StageUpdateFunction;
  onDelete: (stageId: string) => void;
  dragHandleProps?: any;
}

export const StageCard: React.FC<StageCardProps> = ({
  stage,
  index,
  onUpdate,
  onDelete,
  dragHandleProps
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <Card className="p-4 bg-black/40 backdrop-blur-xl border-white/10">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div {...dragHandleProps} className="cursor-move">
                ⋮⋮
              </div>
              <span className="text-sm text-white/60">Stage {index + 1}</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{stage.name}</h3>
            {stage.description && (
              <p className="text-sm text-white/60">{stage.description}</p>
            )}
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">
                {stage.type}
              </span>
              {stage.config.priority && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stage.config.priority === 'high' 
                    ? 'bg-red-500/20 text-red-300'
                    : stage.config.priority === 'medium'
                    ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {stage.config.priority}
                </span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(stage.id)}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};