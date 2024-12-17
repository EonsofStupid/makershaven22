import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface TransitionStateProps {
  isTransitioning: boolean;
  message?: string;
  children: React.ReactNode;
}

export const TransitionState = ({ 
  isTransitioning,
  message = "Loading...",
  children 
}: TransitionStateProps) => {
  return (
    <AnimatePresence mode="wait">
      {isTransitioning ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        >
          <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-black/40 border border-white/10">
            <Loader2 className="h-8 w-8 animate-spin text-[#41f0db]" />
            <p className="text-white/80 text-sm">{message}</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};