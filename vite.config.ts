import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all'), pluginRewriteAll()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
    mainFields: ['main', 'module']
  }
});
