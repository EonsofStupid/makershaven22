
// Re-export the toast function from sonner
import { toast as sonnerToast, ToastT } from "sonner"

export type { ToastT as Toast };

// We'll create a custom toast with our app styling
export function toast(message: string, options: any = {}) {
  return sonnerToast(message, {
    ...options,
    className: "bg-black border border-white/10 text-white",
  });
}

// Export a hook for consuming our toast
export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
    error: (message: string, options?: any) => 
      sonnerToast.error(message, { ...options, className: "bg-red-950 border border-red-500/50 text-white" }),
    success: (message: string, options?: any) => 
      sonnerToast.success(message, { ...options, className: "bg-green-950 border border-green-500/50 text-white" }),
    warning: (message: string, options?: any) => 
      sonnerToast.warning(message, { ...options, className: "bg-yellow-950 border border-yellow-500/50 text-white" }),
    info: (message: string, options?: any) => 
      sonnerToast.info(message, { ...options, className: "bg-blue-950 border border-blue-500/50 text-white" }),
  };
}
