
import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth-store';

export const SessionTransition: React.FC = () => {
  const auth = useAuthStore();
  
  // Only show when transitioning is true
  if (!auth.isTransitioning) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm p-8 bg-black/40 border border-white/10 rounded-lg backdrop-blur-xl text-center"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
            />
          </div>
          
          <h3 className="text-xl font-semibold text-white">
            Session Changing
          </h3>
          
          <p className="text-white/70">
            Please wait while we update your session...
          </p>
        </div>
      </motion.div>
    </div>
  );
};
