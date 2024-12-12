import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  message?: string;
  isVisible: boolean;
  timeout?: number;
  onTimeout?: () => void;
}

export const LoadingOverlay = ({ 
  message = "Loading...", 
  isVisible,
  timeout = 30000,
  onTimeout
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
        <p className="text-white/80 text-sm">{message}</p>
      </div>
    </motion.div>
  );
};