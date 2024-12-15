import React from 'react';
import { FeatureComponent } from './FeatureComponent';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WorkflowComponentProps {
  children: React.ReactNode;
  title: string;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
  loading?: boolean;
  error?: Error | null;
}

export const WorkflowComponent: React.FC<WorkflowComponentProps> = ({
  children,
  title,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onComplete,
  loading,
  error,
}) => {
  return (
    <FeatureComponent
      title={title}
      description={`Step ${currentStep} of ${totalSteps}`}
      loading={loading}
      error={error}
    >
      <div className="space-y-6">
        {children}
        
        <div className="flex justify-between mt-6 pt-6 border-t border-white/10">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={onPrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button
              onClick={onNext}
              className="flex items-center gap-2 ml-auto"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={onComplete}
              className="bg-primary hover:bg-primary/80 ml-auto"
            >
              Complete
            </Button>
          )}
        </div>
      </div>
    </FeatureComponent>
  );
};