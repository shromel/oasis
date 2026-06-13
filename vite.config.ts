import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the app works hosted under any subpath (e.g. GitHub Pages /oasis/).
  base: './',
  plugins: [react()],
  server: { host: true },
})
