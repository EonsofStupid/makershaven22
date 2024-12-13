import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: {
        abortOnError: false, // Do not abort build on TypeScript errors
      },
      eslint: {
        abortOnError: false, // Do not abort build on ESLint errors
      },
    }),
  ],
  server: {
    hmr: false, // Disable Hot Module Replacement to disable live preview
  },
  build: {
    // Any additional build configurations
  },
});
