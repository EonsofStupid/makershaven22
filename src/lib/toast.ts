
import { toast as sonnerToast } from 'sonner';
import type { ToastOptions } from 'sonner';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ExtendedToastOptions extends ToastOptions {
  title?: string;
  description?: string;
  type?: ToastType;
}

/**
 * Enhanced toast functionality with consistent styling and extended options
 */
function toast(message: string, options: ExtendedToastOptions = {}) {
  const { type = 'info', ...restOptions } = options;
  
  switch (type) {
    case 'success':
      return sonnerToast.success(message, restOptions);
    case 'error':
      return sonnerToast.error(message, restOptions);
    case 'warning':
      return sonnerToast.warning(message, restOptions);
    case 'info':
    default:
      return sonnerToast(message, restOptions);
  }
}

// Add direct methods for convenience
toast.success = (message: string, options: Omit<ExtendedToastOptions, 'type'> = {}) => 
  sonnerToast.success(message, options);

toast.error = (message: string, options: Omit<ExtendedToastOptions, 'type'> = {}) => 
  sonnerToast.error(message, options);

toast.warning = (message: string, options: Omit<ExtendedToastOptions, 'type'> = {}) => 
  sonnerToast.warning(message, options);

toast.info = (message: string, options: Omit<ExtendedToastOptions, 'type'> = {}) => 
  sonnerToast(message, options);

toast.custom = sonnerToast.custom;
toast.dismiss = sonnerToast.dismiss;
toast.promise = sonnerToast.promise;

export { toast };
