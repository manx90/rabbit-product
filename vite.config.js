import react from '@vitejs/plugin-react';
import path from 'path';
// import babel from "vite-plugin-babel";
import { dirname } from 'path';
import tailwindcss from 'tailwindcss';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
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
        manualChunks: undefined,
      },
    },
  },
});
