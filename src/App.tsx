import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import { queryClient } from '@/lib/query-client';
import { AuthProvider } from '@/components/auth/providers/AuthProvider';
import { ThemeProvider } from '@/components/theme/providers/ThemeProvider';
import { StoreProvider } from '@/lib/store/providers/StoreProvider';
import { JotaiProvider } from '@/lib/store/providers/JotaiProvider';
import { GlobalErrorBoundary } from '@/components/shared/error-handling/GlobalErrorBoundary';
import { Routes } from '@/routes';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <StoreProvider>
          <BrowserRouter>
            <GlobalErrorBoundary>
              <ThemeProvider>
                <AuthProvider>
                  <AnimatePresence mode="wait">
                    <Routes />
                  </AnimatePresence>
                  <Toaster position="top-right" />
                </AuthProvider>
              </ThemeProvider>
            </GlobalErrorBoundary>
          </BrowserRouter>
        </StoreProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
};

export default App;