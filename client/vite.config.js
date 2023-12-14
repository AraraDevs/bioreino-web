import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
    }),
    svgr(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      src: '/src',
      Components: '/src/Components',
      Context: '/src/Context',
      Hooks: '/src/Hooks',
    },
  },
});
