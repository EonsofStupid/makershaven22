
import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8 text-center"
      >
        <div className="relative mx-auto">
          <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-tr from-neon-cyan/20 to-neon-pink/20 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 rounded-full border-b-4 border-r-4 border-neon-cyan"
            />
          </div>
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 10px 2px rgba(65, 240, 219, 0.2)",
                "0 0 20px 5px rgba(65, 240, 219, 0.4)",
                "0 0 10px 2px rgba(65, 240, 219, 0.2)"
              ] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
          />
        </div>
        
        <h1 className="text-2xl font-semibold text-white">
          Loading...
        </h1>
        
        <p className="text-gray-400 max-w-sm mx-auto">
          Please wait while we prepare your experience
        </p>
      </motion.div>
    </div>
  );
};
