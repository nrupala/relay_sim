import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/relay_sim/',  // GitHub Pages subpath
  build: { 
    outDir: 'dist',
    sourcemap: false
  }
})
