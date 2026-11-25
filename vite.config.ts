import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Backend (Phase 4) runs on :5000; requests to /api are forwarded there in development.
    proxy: { '/api': 'http://localhost:5000' },
  },
});
