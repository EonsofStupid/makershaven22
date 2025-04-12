
import { toast as sonnerToast } from "sonner";

// Type definition for ToastOptions
interface ToastOptions {
  id?: string | number;
  duration?: number;
  icon?: React.ReactNode;
  promise?: Promise<any>;
  closeButton?: boolean;
  className?: string;
  description?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  onDismiss?: () => void;
  onAutoClose?: () => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

// Custom toast function with our styling
export const toast = {
  // Standard toast
  show: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, options);
  },
  
  // Success toast
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, options);
  },
  
  // Error toast
  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, options);
  },
  
  // Info toast
  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, options);
  },
  
  // Warning toast
  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, options);
  },
  
  // Promise toast
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    toastOptions?: ToastOptions
  ) => {
    return sonnerToast.promise(promise, options, toastOptions);
  },
  
  // Dismiss a toast by ID
  dismiss: (toastId?: string | number) => {
    return sonnerToast.dismiss(toastId);
  },
  
  // Custom positioning
  position: (position: ToastOptions['position']) => {
    return sonnerToast.position(position);
  }
};
