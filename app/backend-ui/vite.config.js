import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  plugins: [react()],
  css: {},
  build: {
    outDir: '../../build/backend-ui',
    emptyOutDir: true, // This ensures the directory is emptied before building
    manifest: true,
    chunkSizeWarningLimit: 1200, // Adjust the limit as needed
    rollupOptions: {
      input: {
        'exam-edit': 'src/PageExamEdit.jsx',
        'settings': 'src/PageSettings.jsx',
      },
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        assetFileNames: '[name].css',
        plugins: [
          terser() // Optional: Minify the output
        ],
      },
    },
  },
});
