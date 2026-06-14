import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4174,
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // recharts is heavy and only used in the Finance section (lazy-loaded),
        // so keep it in its own chunk out of the critical path.
        manualChunks: {
          charts: ['recharts'],
        },
      },
    },
  },
})
