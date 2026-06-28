import { readFileSync, writeFileSync } from 'node:fs'

const site = JSON.parse(readFileSync('public/data/site.json', 'utf8'))
const posts = JSON.parse(readFileSync('public/data/posts.json', 'utf8'))

const base = site.url.replace(/\/$/, '')
const indexable = site.indexable === true

const staticRoutes = ['/', '/about', '/experience', '/blog', '/contact']
const postRoutes = posts.map((post) => `/blog/${post.slug}`)
const routes = [...staticRoutes, ...postRoutes]

const robots = indexable
  ? `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
  : `User-agent: *\nDisallow: /\n\nSitemap: ${base}/sitemap.xml\n`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((path) => {
    const loc = path === '/' ? `${base}/` : `${base}${path}`
    return `  <url>\n    <loc>${loc}</loc>\n  </url>`
  })
  .join('\n')}
</urlset>
`

writeFileSync('public/robots.txt', robots)
writeFileSync('public/sitemap.xml', sitemap)

console.log(
  `SEO: robots.txt + sitemap.xml (${routes.length} URLs, indexable=${indexable})`,
)
