import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export const AuthLoadingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4 w-full max-w-md p-6"
    >
      <Skeleton className="h-8 w-3/4 bg-white/5" />
      <Skeleton className="h-10 w-full bg-white/5" />
      <Skeleton className="h-10 w-full bg-white/5" />
      <Skeleton className="h-10 w-full bg-white/5 mt-6" />
    </motion.div>
  );
};