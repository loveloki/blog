import { defineConfig } from 'vite'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@hooks': resolve(__dirname, './src/hooks'),
    },
  },
})
