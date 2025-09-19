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
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    }),
    visualizer(),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-icons/md'],
    force: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'production'
    ),
  },
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
          // Keep React in the main bundle to avoid context issues
          // Don't split React-related modules

          // Router
          if (id.includes('react-router')) {
            return 'router';
          }

          // Forms
          if (id.includes('react-hook-form')) {
            return 'forms';
          }

          // Icons - temporarily disabled to fix build issue
          // if (id.includes('react-icons')) {
          //   return 'icons';
          // }

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
