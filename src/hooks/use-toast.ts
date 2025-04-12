
// Re-export from the shadcn toast component
import { Toast, ToastActionElement, ToastProps } from "../shared/ui/toast";
import { useToast as useShadcnToast } from "../lib/toast";
import { toast } from "../lib/toast";

export {
  toast,
  type ToastActionElement,
  type ToastProps
};

export const useToast = useShadcnToast;
