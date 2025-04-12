
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface SessionLoadingStateProps {
  message?: string;
  subMessage?: string;
}

export const SessionLoadingState = ({ 
  message = "Loading session...",
  subMessage 
}: SessionLoadingStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="flex flex-col items-center gap-4 p-8 rounded-lg bg-black/40 border border-white/10"
      >
        <Loader2 className="h-8 w-8 animate-spin text-[#41f0db]" />
        <div className="text-center">
          <p className="text-white/80 text-sm">{message}</p>
          {subMessage && (
            <p className="text-white/60 text-xs mt-1">{subMessage}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
