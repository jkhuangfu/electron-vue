import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: './layout',
  build: {
    outDir: '../src/renderer'
  },
  server: {
    port: 9008
  },
  plugins: [vue()]
});
