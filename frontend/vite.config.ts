import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          ['babel-plugin-styled-components', {
            displayName: true,
            fileName: false,
            ssr: false,
          }],
        ],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: false, // Временно отключаем минификацию для диагностики
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  optimizeDeps: {
    include: ['styled-components'],
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});

