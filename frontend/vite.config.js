//frontend/vite.config.js < this file path

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

//https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

