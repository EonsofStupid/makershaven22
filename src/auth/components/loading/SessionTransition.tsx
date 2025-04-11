
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export const SessionTransition = () => {
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
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center gap-4 p-8 rounded-lg bg-black/40 border border-white/10"
      >
        <RefreshCw className="h-8 w-8 animate-spin text-[#41f0db]" />
        <p className="text-white/80 text-sm">Updating session...</p>
      </motion.div>
    </motion.div>
  );
};
