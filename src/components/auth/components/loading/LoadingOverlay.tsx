import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  message?: string;
  isVisible: boolean;
  timeout?: number;
  onTimeout?: () => void;
  progress?: number;
}

export const LoadingOverlay = ({ 
  message = "Loading...", 
  isVisible,
  timeout = 30000,
  onTimeout,
  progress
}: LoadingOverlayProps) => {
  React.useEffect(() => {
    if (isVisible && timeout && onTimeout) {
      const timer = setTimeout(onTimeout, timeout);
      return () => clearTimeout(timer);
    }
  }, [isVisible, timeout, onTimeout]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
    >
      <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-black/40 border border-white/10">
        <Loader2 className="h-8 w-8 animate-spin text-[#41f0db]" />
        <div className="space-y-2">
          <p className="text-white/80 text-sm">{message}</p>
          {progress !== undefined && (
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
              <motion.div 
                className="bg-[#41f0db] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};