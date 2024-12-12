import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/store/auth-store";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface SessionTransitionProps {
  children: React.ReactNode;
  loadingMessage?: string;
}

export const SessionTransition = ({ 
  children, 
  loadingMessage = "Loading session..." 
}: SessionTransitionProps) => {
  const { isLoading, isTransitioning } = useAuthStore();

  return (
    <AnimatePresence mode="wait">
      {(isLoading || isTransitioning) ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        >
          <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-black/40 border border-white/10">
            <LoadingSpinner />
            <p className="text-white/80 text-sm">{loadingMessage}</p>
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