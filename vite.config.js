import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  base: '/', // Add base URL configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    // Ensure proper chunking
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'chart-vendor': ['chart.js', 'chartjs-adapter-date-fns'],
          'utils-vendor': ['axios', 'date-fns', 'jwt-decode', 'mitt'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,        // Optional: Specify a port number
    // Uncomment the following line if you encounter network issues
    // strictPort: true,
    // If you have firewall issues, you might need to disable host checking
    // hmr: {
    //   host: 'your-local-ip',
    // },
  },
})
