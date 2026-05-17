import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// WICHTIG: Der `base` Pfad muss exakt dem GitHub Repository-Namen entsprechen,
// damit die Asset-Links auf GitHub Pages funktionieren (username.github.io/Hound/).
export default defineConfig({
  plugins: [react()],
  base: '/Hound/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Three.js, framer-motion und react in separate Chunks splitten
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
