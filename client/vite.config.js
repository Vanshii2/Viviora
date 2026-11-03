import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // '/' locally; '/Viviora/' for the GitHub Pages preview (set by the deploy workflow).
  base: process.env.VITE_BASE_PATH || '/',
  resolve: {
    // Code shared with the server (e.g. assessment answer options), see /shared
    alias: { '@shared': fileURLToPath(new URL('../shared', import.meta.url)) },
  },
  server: {
    port: 5173,
    proxy: { '/api': process.env.API_PROXY_TARGET || 'http://localhost:5050' },
  },
});
