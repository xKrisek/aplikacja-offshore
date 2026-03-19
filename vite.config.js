import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/aplikacja-offshore/',
  server: {
    host: true,
    port: 2137,
    strictPort: true,
  }
})
