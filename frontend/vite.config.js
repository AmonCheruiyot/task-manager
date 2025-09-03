import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend will run on port 3000 as per project specs
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // Forward API requests to the Flask backend
        changeOrigin: true,
      },
    },
  },
});
