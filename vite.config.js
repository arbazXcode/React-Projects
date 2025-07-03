import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'  // If you're using React

export default defineConfig({
  plugins: [
    react(),          // React support
    tailwindcss(),    // Tailwind v4 plugin
  ],
})
