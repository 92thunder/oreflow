import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({ registerType: 'autoUpdate' }),
    react()
  ],
  define: {
    global: 'window'
  },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
})
