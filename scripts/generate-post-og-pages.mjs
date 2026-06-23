/**
 * Inject per-post Open Graph meta into static HTML shells for social crawlers.
 * GitHub Pages serves dist/blog/{slug}.html for /blog/{slug} requests.
 */
import fs from 'node:fs'
import path from 'node:path'
import { absoluteUrl, escapeHtml, getSiteUrl } from './lib/site-url.mjs'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const indexFile = path.join(distDir, 'index.html')
const postsDir = path.join(distDir, 'data', 'posts')
const outDir = path.join(distDir, 'blog')
const siteUrl = getSiteUrl()

function readSiteName() {
  const siteFile = path.join(root, 'public', 'data', 'site.json')
  if (!fs.existsSync(siteFile)) return 'Tekkisma'
  const site = JSON.parse(fs.readFileSync(siteFile, 'utf8'))
  return site.brand ?? site.name ?? 'Tekkisma'
}

function buildMetaBlock(post, siteName) {
  const title = post.share.title.es
  const description = post.share.description.es
  const url = post.share.url
  const image = post.share.image
  const published = post.date ? new Date(post.date).toISOString() : null

  const tags = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:locale" content="es_ES" />`,
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
  ]

  if (image) {
    tags.push(`<meta property="og:image" content="${escapeHtml(image)}" />`)
    tags.push(`<meta name="twitter:image" content="${escapeHtml(image)}" />`)
  }

  if (published) {
    tags.push(`<meta property="article:published_time" content="${escapeHtml(published)}" />`)
  }

  return tags.join('\n    ')
}

function stripSocialMeta(html) {
  return html
    .split('\n')
    .filter(
      (line) =>
        !line.includes('property="og:') &&
        !line.includes('name="twitter:') &&
        !line.includes('property="article:') &&
        !line.includes('rel="canonical"'),
    )
    .join('\n')
}

function injectMeta(template, post, siteName) {
  const title = `${post.share.title.es} — Ismael Pradas`
  const metaBlock = buildMetaBlock(post, siteName)
  const cleaned = stripSocialMeta(template)

  return cleaned
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, metaBlock)
}

if (!fs.existsSync(indexFile)) {
  console.log('Skipping OG pages: dist/index.html not found (run after vite build).')
  process.exit(0)
}

if (!fs.existsSync(postsDir)) {
  console.log('Skipping OG pages: no dist/data/posts directory.')
  process.exit(0)
}

const template = fs.readFileSync(indexFile, 'utf8')
const siteName = readSiteName()
const postFiles = fs.readdirSync(postsDir).filter((name) => name.endsWith('.json'))

fs.mkdirSync(outDir, { recursive: true })

let count = 0
for (const file of postFiles) {
  const post = JSON.parse(fs.readFileSync(path.join(postsDir, file), 'utf8'))
  if (!post.share) continue

  const html = injectMeta(template, post, siteName)
  fs.writeFileSync(path.join(outDir, `${post.slug}.html`), html)
  count += 1
}

console.log(`Wrote ${count} OG HTML page(s) to dist/blog/`)
