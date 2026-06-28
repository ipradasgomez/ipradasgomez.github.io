import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { transformSync } from 'esbuild'
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

function minifyMntFile() {
  return {
    name: 'minify-mnt-file',
    apply: 'build',
    closeBundle() {
      const file = 'dist/mnt.js'
      if (!existsSync(file)) return
      const source = readFileSync(file, 'utf8')
      const { code } = transformSync(source, { minify: true })
      writeFileSync(file, code)
    },
  }
}

function mntVersion() {
  const file = 'public/mnt.js'
  if (!existsSync(file)) return 'dev'
  return createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 8)
}

/** mnt.js cache buster from file content hash. */
function siteHtml() {
  return {
    name: 'site-html',
    transformIndexHtml(html) {
      return html.replaceAll('__MNT_VERSION__', mntVersion())
    },
  }
}

/** Vue runtime in its own chunk — app code can change without invalidating vendor cache. */
function vendorChunk(id) {
  if (/node_modules\/(vue|vue-router|@vue)\//.test(id)) return 'vendor'
  if (/node_modules\/marked\//.test(id)) return 'marked'
}

export default defineConfig(({ mode }) => {
  const production = mode === 'production'

  return {
    plugins: [
      vue(),
      tinaAdminRedirect(),
      siteHtml(),
      ...(production ? [minifyMntFile()] : []),
    ],
    base: '/',
    server: {
      host: true,
      port: 5173,
      watch: {
        usePolling: true,
      },
    },
    build: {
      minify: production ? 'terser' : 'esbuild',
      cssMinify: production,
      target: 'es2020',
      modulePreload: { polyfill: true },
      ...(production && {
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            ecma: 2020,
            passes: 2,
            pure_funcs: ['console.info', 'console.debug', 'console.trace'],
            unused: true,
          },
          mangle: {
            safari10: true,
          },
          format: {
            comments: false,
            ecma: 2020,
          },
        },
        rollupOptions: {
          output: {
            manualChunks: vendorChunk,
          },
        },
      }),
    },
  }
})
