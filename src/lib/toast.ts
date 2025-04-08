
import { toast as sonnerToast, type Toast } from 'sonner';

/**
 * Enhanced toast wrapper with standardized configurations
 */
const toast = {
  /**
   * Show a default toast message
   */
  message: (message: string, options?: Toast) => {
    return sonnerToast(message, options);
  },

  /**
   * Show a success toast message
   */
  success: (message: string, options?: Toast) => {
    return sonnerToast.success(message, options);
  },

  /**
   * Show an error toast message
   */
  error: (message: string, options?: Toast) => {
    return sonnerToast.error(message, options);
  },

  /**
   * Show a warning toast message
   */
  warning: (message: string, options?: Toast) => {
    return sonnerToast.warning(message, options);
  },

  /**
   * Show an info toast message
   */
  info: (message: string, options?: Toast) => {
    return sonnerToast.info(message, options);
  },

  /**
   * Show a loading toast message
   */
  loading: (message: string, options?: Toast) => {
    const id = sonnerToast.loading(message, options);
    return id.toString();
  },

  /**
   * Update a toast message
   */
  update: (id: string, message: string, options?: Toast) => {
    sonnerToast.dismiss(id);
    return sonnerToast(message, options);
  },

  /**
   * Convert a loading toast to another type
   */
  updateLoading: (id: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    sonnerToast.dismiss(id);
    return sonnerToast[type](message);
  },

  /**
   * Dismiss a toast by ID
   */
  dismiss: (id: string) => {
    sonnerToast.dismiss(id);
  },

  /**
   * Dismiss all toast notifications
   */
  dismissAll: () => {
    sonnerToast.dismiss();
  },

  /**
   * Create a promise toast
   */
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    },
    toastOptions?: Toast
  ) => {
    return sonnerToast.promise(promise, options, toastOptions);
  }
};

export default toast;
