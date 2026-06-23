/**
 * Sync content/posts/*.md → public/data/posts.json for the Vue blog view.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const postsDir = path.join(root, 'content', 'posts')
const outFile = path.join(root, 'public', 'data', 'posts.json')

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

const posts = listMarkdownFiles(postsDir)
  .map((file) => {
    const raw = fs.readFileSync(file, 'utf8')
    const { data } = matter(raw)
    const slug = slugFrom(file)

    return {
      slug,
      date: data.date ?? null,
      title: {
        es: data.title ?? slug,
        en: data.titleEn ?? data.title ?? slug,
      },
      excerpt: {
        es: data.excerpt ?? '',
        en: data.excerptEn ?? data.excerpt ?? '',
      },
      tags: Array.isArray(data.tags) ? data.tags : [],
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, `${JSON.stringify(posts, null, 2)}\n`)
console.log(`Wrote ${posts.length} post(s) to public/data/posts.json`)
