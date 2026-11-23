import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/hub-pet/',
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
