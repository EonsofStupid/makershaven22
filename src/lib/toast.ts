import { toast as sonnerToast, ToastT, ToastOptions } from 'sonner';

// Keep track of active toast IDs to prevent duplicates
const activeToasts = new Set<string>();

type ToastType = 'success' | 'error' | 'info' | 'loading';

function createMessageId(message: string, type: ToastType): string {
  return `${type}:${message}`;
}

interface ToastParams {
  message: string;
  description?: string;
  duration?: number;
  type?: ToastType;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function toast({
  message,
  description,
  duration = 4000,
  type = 'info',
  action
}: ToastParams): string | null {
  // Create a unique ID for this message
  const messageId = createMessageId(message, type);
  
  // If the toast is already active, don't show it again
  if (activeToasts.has(messageId)) {
    return null;
  }
  
  // Add to active toasts
  activeToasts.add(messageId);

  // Configure the toast options
  const options: ToastOptions = {
    id: messageId,
    description,
    duration,
    onDismiss: () => {
      activeToasts.delete(messageId);
    },
  };

  if (action) {
    options.action = {
      label: action.label,
      onClick: () => {
        action.onClick();
        activeToasts.delete(messageId);
      }
    };
  }

  // Show the appropriate toast type
  let toastId: string;
  
  switch (type) {
    case 'success':
      toastId = sonnerToast.success(message, options);
      break;
    case 'error':
      toastId = sonnerToast.error(message, options);
      break;
    case 'loading':
      toastId = sonnerToast.loading(message, options);
      break;
    default:
      toastId = sonnerToast(message, options);
  }
  
  return toastId;
}

// Helper methods for common toast types
toast.success = (message: string, options?: Omit<ToastParams, 'message' | 'type'>) => 
  toast({ message, type: 'success', ...options });

toast.error = (message: string, options?: Omit<ToastParams, 'message' | 'type'>) => 
  toast({ message, type: 'error', ...options });

toast.info = (message: string, options?: Omit<ToastParams, 'message' | 'type'>) => 
  toast({ message, type: 'info', ...options });

toast.loading = (message: string, options?: Omit<ToastParams, 'message' | 'type'>) => 
  toast({ message, type: 'loading', ...options });

// Dismiss helpers
toast.dismiss = sonnerToast.dismiss;
toast.dismissAll = sonnerToast.dismiss;

// Update a loading toast
toast.update = (toastId: string, message: string, description?: string) => {
  sonnerToast.update(toastId, { description });
};

// Convert a loading toast to success/error
toast.success.fromLoading = (toastId: string, message: string, description?: string) => {
  sonnerToast.success(message, { id: toastId, description });
};

toast.error.fromLoading = (toastId: string, message: string, description?: string) => {
  sonnerToast.error(message, { id: toastId, description });
};
