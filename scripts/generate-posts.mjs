/**
 * Sync content/posts/*.md → public/data/posts.json (index) + public/data/posts/{slug}.json
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { absoluteUrl, getSiteUrl } from './lib/site-url.mjs'

const root = process.cwd()
const postsDir = path.join(root, 'content', 'posts')
const outFile = path.join(root, 'public', 'data', 'posts.json')
const postsOutDir = path.join(root, 'public', 'data', 'posts')

function slugFrom(file) {
  return path.basename(file, path.extname(file))
}

function listMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.join(dir, name))
}

function readingTimeMinutes(text) {
  if (!text?.trim()) return 0
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function mapPost(file) {
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const slug = slugFrom(file)
  const bodyEs = content.trim()
  const bodyEn = (data.bodyEn ?? '').trim() || bodyEs
  const siteUrl = getSiteUrl()

  const title = {
    es: data.title ?? slug,
    en: data.titleEn ?? data.title ?? slug,
  }
  const summary = {
    es: data.summary ?? data.excerpt ?? '',
    en: data.summaryEn ?? data.summary ?? data.excerptEn ?? data.excerpt ?? '',
  }
  const excerpt = {
    es: data.excerpt ?? data.summary ?? '',
    en: data.excerptEn ?? data.excerpt ?? data.summaryEn ?? data.summary ?? '',
  }
  const shareTitle = {
    es: data.ogTitle ?? title.es,
    en: data.ogTitleEn ?? data.ogTitle ?? title.en,
  }
  const shareDescription = {
    es: data.ogDescription ?? excerpt.es,
    en: data.ogDescriptionEn ?? data.ogDescription ?? excerpt.en,
  }
  const shareImage = absoluteUrl(
    data.ogImage ?? data.previewImage ?? data.coverImage,
    siteUrl,
  )

  return {
    slug,
    date: data.date ?? null,
    published: data.published === true,
    author: data.author ?? 'Ismael Pradas',
    coverImage: data.coverImage ?? null,
    previewImage: data.previewImage ?? null,
    title,
    summary,
    excerpt,
    body: {
      es: bodyEs,
      en: bodyEn,
    },
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: {
      es: readingTimeMinutes(bodyEs),
      en: readingTimeMinutes(bodyEn),
    },
    share: {
      title: shareTitle,
      description: shareDescription,
      image: shareImage,
      url: `${siteUrl}/blog/${slug}`,
    },
  }
}

function writePostFiles(posts) {
  fs.mkdirSync(postsOutDir, { recursive: true })

  const existing = fs.existsSync(postsOutDir)
    ? fs.readdirSync(postsOutDir).filter((name) => name.endsWith('.json'))
    : []

  const nextSlugs = new Set(posts.map((post) => `${post.slug}.json`))
  for (const name of existing) {
    if (!nextSlugs.has(name)) {
      fs.unlinkSync(path.join(postsOutDir, name))
    }
  }

  for (const post of posts) {
    const file = path.join(postsOutDir, `${post.slug}.json`)
    fs.writeFileSync(file, `${JSON.stringify(post, null, 2)}\n`)
  }
}

const posts = listMarkdownFiles(postsDir)
  .map(mapPost)
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

writePostFiles(posts)

const index = posts.map(({ body, published, ...summary }) => summary)

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, `${JSON.stringify(index, null, 2)}\n`)
console.log(`Wrote ${posts.length} post(s) to public/data/posts.json`)
