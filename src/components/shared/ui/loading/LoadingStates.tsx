
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingProps> = ({ 
  size = 'md', 
  className,
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
      {text && <span className="ml-2">{text}</span>}
    </div>
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn(
      'rounded-lg bg-black/20 backdrop-blur-lg animate-pulse', 
      'border border-white/5 p-4 h-40',
      className
    )}>
      <div className="h-4 bg-white/10 rounded-full w-3/4 mb-4"></div>
      <div className="h-2 bg-white/10 rounded-full mb-2"></div>
      <div className="h-2 bg-white/10 rounded-full w-5/6 mb-2"></div>
      <div className="h-2 bg-white/10 rounded-full w-4/6 mb-4"></div>
      <div className="mt-auto flex justify-between">
        <div className="h-6 bg-white/10 rounded-full w-1/4"></div>
        <div className="h-6 bg-white/10 rounded-full w-1/4"></div>
      </div>
    </div>
  );
};

export const GridSkeleton: React.FC<{ count?: number, className?: string }> = ({ 
  count = 6,
  className
}) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number, columns?: number, className?: string }> = ({ 
  rows = 5,
  columns = 4,
  className
}) => {
  return (
    <div className={cn('w-full rounded-md overflow-hidden', className)}>
      <div className="bg-black/30 p-4">
        <div className="h-6 bg-white/10 rounded-full w-1/4 mb-2"></div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-4 bg-black/20 p-3 border-b border-white/5">
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="h-4 bg-white/10 rounded-full"></div>
          ))}
        </div>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 p-3 border-b border-white/5">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-white/10 rounded-full"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const FormSkeleton: React.FC<{ fields?: number, className?: string }> = ({ 
  fields = 4,
  className
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-white/10 rounded-full w-1/4"></div>
          <div className="h-10 bg-white/5 rounded-md w-full"></div>
        </div>
      ))}
      <div className="h-10 bg-primary/20 rounded-md w-1/3"></div>
    </div>
  );
};
