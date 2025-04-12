
// Re-export from the shadcn toast component
import { useToast as useShadcnToast, toast } from "../shared/ui/toast";
import type { ToastActionElement, ToastProps } from "../shared/ui/toast";

export {
  toast,
  type ToastActionElement,
  type ToastProps
};

export const useToast = useShadcnToast;
