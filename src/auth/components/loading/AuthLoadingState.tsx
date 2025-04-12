
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface AuthLoadingStateProps {
  message?: string;
  metadata?: {
    progress?: number;
    details?: string;
  };
}

export const AuthLoadingState = ({ 
  message = "Authenticating...",
  metadata 
}: AuthLoadingStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-[200px]"
    >
      <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
        <Loader2 className="h-8 w-8 animate-spin text-[#41f0db]" />
        <div className="space-y-2 text-center">
          <p className="text-white/80 text-sm animate-pulse">{message}</p>
          {metadata?.details && (
            <p className="text-white/60 text-xs">{metadata.details}</p>
          )}
          {metadata?.progress !== undefined && (
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
              <div 
                className="bg-[#41f0db] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${metadata.progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
