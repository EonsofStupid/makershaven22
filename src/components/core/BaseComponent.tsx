import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface BaseComponentProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  loading?: boolean;
  error?: Error | null;
}

export const BaseComponent: React.FC<BaseComponentProps> = ({
  children,
  className = '',
  animate = true,
  loading = false,
  error = null,
}) => {
  if (error) {
    toast.error(error.message);
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const content = (
    <div className={className}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.div>
  );
};