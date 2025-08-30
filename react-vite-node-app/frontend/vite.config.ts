import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://backend:5000'
    },
    watch: {  //! added to work the the docker on the D: drive
      usePolling: true,
      interval: 100,
    },
    host: true,
  }  
})
