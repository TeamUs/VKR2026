import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Плагин: записывает дату/время сборки в dist/build-info.json
function buildInfoPlugin() {
  return {
    name: 'build-info',
    closeBundle() {
      const outDir = path.resolve(process.cwd(), 'dist');
      const buildInfo = {
        buildTime: new Date().toISOString(),
        buildTimeLocal: new Date().toLocaleString('ru-RU')
      };
      fs.writeFileSync(path.join(outDir, 'build-info.json'), JSON.stringify(buildInfo, null, 2));
    }
  };
}

export default defineConfig({
  // Подпуть для деплоя ВКР на одном домене (например https://домен/vkr/)
  base: process.env.VITE_APP_BASE_PATH || './',
  plugins: [
    buildInfoPlugin(),
    react({
      babel: {
        plugins: [],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  optimizeDeps: {
    include: ['styled-components'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  // Server config только для development
  ...(process.env.NODE_ENV === 'development' && {
    server: {
      port: 3001,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  }),
});

