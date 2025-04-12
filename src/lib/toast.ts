
import { useState, useCallback, useEffect } from "react";
import { toast as sonnerToast } from "sonner";

// Types from shadcn's toast
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

// Define a Toast component to maintain type compatibility
const Toast: React.FC<ToastProps> = () => null;
const ToastAction: React.FC<any> = () => null;

// Types for maintaining compatibility with shadcn toast
interface ToastOptions {
  title?: string;
  description?: React.ReactNode;
  action?: ToastActionElement;
  cancel?: { label: string; onClick?: () => void };
  duration?: number;
}

// Types from sonner
type ExternalToast = Parameters<typeof sonnerToast>[1];

// Helper function to convert shadcn toast format to sonner toast format
function convertToSonnerToast(options?: ToastOptions): ExternalToast {
  if (!options) return {};
  
  return {
    ...options,
    // Convert shadcn action to sonner action
    action: options.action ? {
      label: "Action",
      onClick: () => console.log("Action clicked")
    } : undefined,
  };
}

// Create custom toast functions that match shadcn API
const customToast = {
  default: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, convertToSonnerToast(options));
  },
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, convertToSonnerToast(options));
  },
  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, convertToSonnerToast(options));
  },
  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, convertToSonnerToast(options));
  },
  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, convertToSonnerToast(options));
  },
  dismiss: (toastId?: string) => {
    if (toastId) {
      sonnerToast.dismiss(toastId);
    } else {
      sonnerToast.dismiss();
    }
  },
  // Support this method for backwards compatibility
  custom: (
    message: string,
    options?: ToastOptions
  ) => {
    // For custom toasts, we'll just use the default style
    return sonnerToast(message, convertToSonnerToast(options));
  },
  promise: sonnerToast.promise,
  loading: sonnerToast.loading,
};

// Export the custom toast
export const toast = customToast;

// Create a hook for compatibility with shadcn toast
export function useToast() {
  const [toasts, setToasts] = useState<any[]>([]);

  // This is mainly for type compatibility, as sonner manages its own state
  useEffect(() => {
    // This would normally track toasts but we're using sonner's internal state
    return () => {
      // cleanup if needed
    };
  }, []);

  return {
    toast: customToast,
    toasts,
    dismiss: customToast.dismiss,
  };
}
