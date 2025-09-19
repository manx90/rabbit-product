import react from '@vitejs/plugin-react';
import path from 'path';
// import babel from "vite-plugin-babel";
import { dirname } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from 'tailwindcss';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), visualizer()],
  css: {
    plugins: [tailwindcss()],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 0,
    strictPort: false,
    open: true,
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React and React DOM
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          if (id.includes('react/') || id.includes('react\\')) {
            return 'react';
          }

          // Router
          if (id.includes('react-router')) {
            return 'router';
          }

          // Forms
          if (id.includes('react-hook-form')) {
            return 'forms';
          }

          // Icons
          if (id.includes('react-icons')) {
            return 'icons';
          }

          // Utils
          if (id.includes('tailwind-merge') || id.includes('clsx')) {
            return 'utils';
          }

          // UI Components
          if (id.includes('/components/ui/')) {
            return 'ui-components';
          }

          // Large libraries
          if (
            id.includes('lodash') ||
            id.includes('moment') ||
            id.includes('date-fns')
          ) {
            return 'large-libs';
          }

          // Node modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
