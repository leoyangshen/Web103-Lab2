import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 1. Configure the development server
  server: {
    // 2. Set up the proxy rule
    proxy: {
      // If the browser requests anything starting with /gifts
      '/gifts': {
        // Forward it to your Express server (running on port 3001)
        target: 'http://localhost:3001', 
        changeOrigin: true, // Necessary for virtual hosted sites
        secure: false, // For local development
      },
      // You may need to add other API routes here if you have them,
      // e.g., '/api', '/users', etc.
    }
  }
})

