import React from 'react';
import { BaseComponent } from './BaseComponent';
import { Card } from '@/components/ui/card';

interface FeatureComponentProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  loading?: boolean;
  error?: Error | null;
  className?: string;
}

export const FeatureComponent: React.FC<FeatureComponentProps> = ({
  children,
  title,
  description,
  loading,
  error,
  className = '',
}) => {
  return (
    <BaseComponent loading={loading} error={error}>
      <Card className={`p-6 bg-black/40 backdrop-blur-xl border-white/10 ${className}`}>
        {title && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            {description && (
              <p className="text-sm text-white/60 mt-1">{description}</p>
            )}
          </div>
        )}
        {children}
      </Card>
    </BaseComponent>
  );
};