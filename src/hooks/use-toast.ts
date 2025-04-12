
// re-export from the shadcn toast component
import { useToast as useShadcnToast } from "../shared/ui/toast";
export { toast } from "../shared/ui/toast";
export const useToast = useShadcnToast;
