import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/sonasid/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
  server:{
    port: 3000,
  },
})

