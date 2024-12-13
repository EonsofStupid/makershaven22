import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: {
        abortOnError: false,
      },
      eslint: {
        abortOnError: false,
      },
    }),
  ],
  server: {
    port: 8080,
    hmr: false,
  },
  build: {
    // Any additional build configurations
  },
});
