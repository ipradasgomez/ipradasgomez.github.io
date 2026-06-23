import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/** Redirect /admin → /admin/index.html (Tina CMS). */
function tinaAdminRedirect() {
  return {
    name: 'tina-admin-redirect',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url === '/admin' || url === '/admin/') {
          res.writeHead(302, { Location: '/admin/index.html' })
          res.end()
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [vue(), tinaAdminRedirect()],
  base: '/',
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
})
