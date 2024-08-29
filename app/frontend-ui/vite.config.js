import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(
	{
		plugins: [react()],
		css: {
		},
		build: {
			// minify: false,
			// terserOptions: {
			// mangle: false, // Keep variable names unchanged
			// },
			outDir: '../../build/frontend-ui',
			emptyOutDir: true, // This ensures the directory is emptied before building
			manifest: true,
			chunkSizeWarningLimit: 1200, // Adjust the limit as needed
			rollupOptions: {
				input: {
					'app': 'src/App.jsx',
				},
				output: {
					format: "esm",
					entryFileNames: '[name].js',
					assetFileNames: '[name].css',

				}
			}
		}
	}
)
