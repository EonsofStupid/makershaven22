
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useTheme } from '@/components/theme/ThemeContext';
import { cn } from '@/lib/utils';

export interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const { theme } = useTheme();
  
  return (
    <>
      {children}
      <Toaster 
        position="top-right" 
        expand={false} 
        richColors 
        closeButton
        theme="dark"
        className="toaster group"
        toastOptions={{
          className: cn(
            "group glass-card bg-black/85 backdrop-blur-xl",
            "text-white border border-[var(--neon-cyan)]/30",
            "shadow-[0_0_15px_rgba(var(--neon-cyan-rgb),0.2)]",
            "data-[type=success]:border-[var(--neon-cyan)]/40",
            "data-[type=error]:border-[var(--neon-pink)]/40",
            "data-[type=info]:border-[var(--neon-purple)]/40"
          ),
          descriptionClassName: "text-white/80",
          actionClassName: cn(
            "bg-[var(--neon-cyan)]/20 text-white",
            "border border-[var(--neon-cyan)]/40",
            "hover:bg-[var(--neon-cyan)]/30 transition-colors",
            "focus:ring-2 focus:ring-[var(--neon-cyan)]/30 focus:outline-none"
          ),
          cancelClassName: cn(
            "bg-white/5 text-white",
            "border border-white/10",
            "hover:bg-white/10 transition-colors",
            "focus:ring-2 focus:ring-white/20 focus:outline-none"
          ),
          duration: 4000,
        }}
      />
    </>
  );
}
