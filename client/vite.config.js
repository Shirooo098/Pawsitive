import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
  },
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api' : {
        target: process.env.PUBLIC_PROD_URL,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
