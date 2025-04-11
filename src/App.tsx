
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <main className="min-h-screen bg-black text-white">
            <div className="container mx-auto py-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#41f0db] via-[#ff0abe] to-[#8000ff] text-transparent bg-clip-text">
                MakersImpulse
              </h1>
              <p className="text-gray-400 mt-4">
                Building with Zustand and Jotai hybrid architecture
              </p>
            </div>
          </main>
          <Toaster position="top-right" />
        </TooltipProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
