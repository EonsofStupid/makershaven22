
import { useState, useCallback } from "react";
import { toast as sonnerToast } from "sonner";
import type { ToastActionElement } from "../shared/ui/toast";

// Types for maintaining compatibility with shadcn toast
interface ToastOptions {
  title?: string;
  description?: React.ReactNode;
  action?: ToastActionElement;
  cancel?: { label: string; onClick?: () => void };
  duration?: number;
}

// Helper function to convert shadcn toast format to sonner toast format
function convertToSonnerToast(options?: ToastOptions): any {
  if (!options) return {};
  
  const sonnerOptions: any = {
    ...options,
  };
  
  // Convert shadcn action to sonner action
  if (options.action) {
    sonnerOptions.action = {
      label: "Action",
      onClick: () => console.log("Action clicked")
    };
  }
  
  return sonnerOptions;
}

// Create custom toast functions that match shadcn API
const customToast = {
  toasts: [],
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
  return {
    toast: customToast,
    dismiss: customToast.dismiss,
  };
}
