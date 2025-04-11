
// re-export from the shadcn toast component
import { useToast as useShadcnToast } from "../components/ui/toast";
export { toast } from "../components/ui/toast";
export const useToast = useShadcnToast;
