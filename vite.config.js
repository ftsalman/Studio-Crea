import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const r = (p) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': r('./src'),
      '@lib': r('./lib'),
      '@assets': r('./src/assets'),
      '@components': r('./src/components'),
      '@config': r('./src/config'),
      '@constants': r('./src/constants'),
      '@features': r('./src/features'),
      '@hooks': r('./src/hooks'),
      '@layout': r('./src/layout'),
      '@pages': r('./src/pages'),
      '@services': r('./src/services'),
      '@utils': r('./src/utils'),
    },
  },
  server: { port: 5173, open: true },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['gsap', '@gsap/react', 'lenis'],
        },
      },
    },
  },
})
