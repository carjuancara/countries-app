import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv' // importacion de dotenv
dotenv.config()
const { VITE_BASE_URL } = process.env
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  define: {
    'process.env': {
      VITE_BASE_URL: JSON.stringify(VITE_BASE_URL)
    }
  }
})
