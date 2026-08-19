import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/student': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/students': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/jobs': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/employers': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/applications': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/notifications': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/matching': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/learning': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/interviews': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/government': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/passport': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            if (id.includes('lucide-react') || id.includes('react-hot-toast')) {
              return 'vendor-ui';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})


