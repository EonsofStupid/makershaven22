import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "sonner";
import { checkRateLimit } from "@/utils/errorHandling";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Check rate limit before retrying
        if (!checkRateLimit('query-retry')) {
          toast.error('Too many requests. Please try again later.');
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      meta: {
        errorMessage: "Failed to fetch data",
      },
    },
    mutations: {
      retry: (failureCount, error) => {
        if (!checkRateLimit('mutation-retry')) {
          toast.error('Too many requests. Please try again later.');
          return false;
        }
        return failureCount < 2;
      },
      meta: {
        successMessage: "Operation completed successfully",
        errorMessage: "Operation failed",
      },
      onError: (error: Error, variables: unknown, context: unknown) => {
        console.error('Mutation error:', error);
        toast.error('Operation failed', {
          description: error.message,
          duration: 5000,
        });
      },
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};