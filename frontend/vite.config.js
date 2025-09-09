import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const { BACKEND_PORT, BACKEND_HOST, FRONTEND_PORT } = loadEnv(mode, '../', '');
  return {
    plugins: [vue()],
    define: {
      '__APP_ENV_': { BACKEND_HOST, BACKEND_PORT },
    },
    server: {
      port: FRONTEND_PORT ? Number(FRONTEND_PORT) : 5173,
      host: true,
      strictPort: true
    },
  }
})