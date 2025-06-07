
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // If using react, adjust accordingly
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: {
    rollupOptions: {
      // Additional rollup options
    }
  }
});
