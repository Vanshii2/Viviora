import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // '/' locally; '/Viviora/' for the GitHub Pages preview (set by the deploy workflow).
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:5050' },
  },
});
