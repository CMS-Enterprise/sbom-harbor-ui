import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

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
  plugins: [react(), visualizer() as PluginOption],
  appType: 'spa',
})
