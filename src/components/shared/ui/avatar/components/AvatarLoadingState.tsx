import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface AvatarLoadingStateProps {
  size: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AvatarLoadingState = ({ size, className }: AvatarLoadingStateProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16" // Increased size for oversized avatar
  };

  return (
    <div className="relative group">
      <Skeleton 
        className={cn(
          sizeClasses[size], 
          "rounded-full relative overflow-hidden",
          "bg-gradient-to-br from-[#41f0db]/20 to-[#8000ff]/20",
          className
        )}
      />
      
      {/* Cyberpunk-style loading animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      
      {/* Neon glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 rounded-full" />
      
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30" />
      
      {/* Interactive hover ring */}
      <div className="absolute inset-0 rounded-full border border-[#41f0db]/20 group-hover:border-[#41f0db]/50 transition-colors duration-300" />
    </div>
  );
};