import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
    global: {},
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
  appType: 'spa',
})
