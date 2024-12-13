import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // Temporarily disable build during foundation restructuring
    ...(process.env.SKIP_BUILD ? {
      watch: null,
      minify: false,
      sourcemap: false
    } : {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    }),
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});