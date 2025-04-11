
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  return (
    <BrowserRouter>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
  );
};

export default App;
