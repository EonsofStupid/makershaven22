
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  fullScreen = false,
  className,
}) => {
  const containerClasses = cn(
    'flex flex-col items-center justify-center p-4 gap-4',
    fullScreen && 'fixed inset-0 bg-background/50 backdrop-blur-sm z-50',
    className
  );

  return (
    <div className={containerClasses}>
      <LoadingSpinner size="lg" color="neon-cyan" />
      <p className="text-muted-foreground text-sm animate-pulse">{message}</p>
    </div>
  );
};
