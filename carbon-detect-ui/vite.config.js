import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://10.107.48.34:5000', // 👈 YOUR BACKEND IP
        changeOrigin: true,
      },
    },
  },
})
