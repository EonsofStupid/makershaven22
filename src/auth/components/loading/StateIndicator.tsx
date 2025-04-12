
import { motion } from "framer-motion";
import { Check, AlertCircle, Loader2 } from "lucide-react";

type LoadingState = 'loading' | 'success' | 'error' | 'idle';

interface StateIndicatorProps {
  state: LoadingState;
  message?: string;
  className?: string;
}

export const StateIndicator = ({ 
  state, 
  message,
  className = "" 
}: StateIndicatorProps) => {
  const getIcon = () => {
    switch (state) {
      case 'loading':
        return <Loader2 className="h-5 w-5 animate-spin text-[#41f0db]" />;
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-center gap-2 ${className}`}
    >
      {getIcon()}
      {message && <span className="text-sm text-white/80">{message}</span>}
    </motion.div>
  );
};
