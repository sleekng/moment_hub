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
