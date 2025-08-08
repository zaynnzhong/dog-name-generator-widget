import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'widget') {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: 'src/widget.tsx',
          name: 'DogNameGeneratorWidget',
          fileName: 'dog-name-generator-widget',
          formats: ['iife']
        },
        rollupOptions: {
          external: [],
          output: {
            globals: {}
          }
        },
        outDir: 'dist'
      }
    }
  }

  return {
    plugins: [react()],
  }
}) 