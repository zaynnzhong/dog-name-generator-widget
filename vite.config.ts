import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react()],
    // This is the crucial part to fix the "process is not defined" error.
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development')
    }
  };

  if (mode === 'widget') {
    config.build = {
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
    };
  }

  return config;
}) 