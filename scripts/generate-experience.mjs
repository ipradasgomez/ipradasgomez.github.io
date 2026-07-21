/**
 * Sync content/experience/*.md → public/data/experience.json for the Vue timeline.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const experienceDir = path.join(root, 'content', 'experience')
const outFile = path.join(root, 'public', 'data', 'experience.json')

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

const experience = listMarkdownFiles(experienceDir)
  .map((file) => {
    const raw = fs.readFileSync(file, 'utf8')
    const { data } = matter(raw)
    const slug = slugFrom(file)

    return {
      slug,
      company: data.companyEn
        ? { es: data.company ?? '', en: data.companyEn }
        : (data.company ?? ''),
      published: data.published === true,
      role: {
        es: data.role ?? slug,
        en: data.roleEn ?? data.role ?? slug,
      },
      period: {
        es: data.period ?? '',
        en: data.periodEn ?? data.period ?? '',
      },
      current: Boolean(data.current),
      description: {
        es: data.description ?? '',
        en: data.descriptionEn ?? data.description ?? '',
      },
      highlights: (data.highlights ?? [])
        .filter((h) => h && (h.text || h.textEn))
        .map((h) => ({
          type: h.type === 'achievement' ? 'achievement' : 'action',
          text: {
            es: h.text ?? '',
            en: h.textEn ?? h.text ?? '',
          },
        })),
      startDate: data.startDate ?? null,
    }
  })
  .filter((item) => item.published)
  .map(({ published, ...item }) => item)
  .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, `${JSON.stringify(experience, null, 2)}\n`)
console.log(`Wrote ${experience.length} experience item(s) to public/data/experience.json`)
