import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      context: "/src/context",
      assets: "/src/assets",
    }
  },
  build: {
    cssMinify: false,
    minify: false,
    terserOptions: {
      compress: false,
      mangle: false,
    }
  }
})
