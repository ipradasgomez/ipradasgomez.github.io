import fs from 'node:fs'
import path from 'node:path'

export function getSiteUrl() {
  const fromEnv = process.env.SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')

  const siteFile = path.join(process.cwd(), 'public', 'data', 'site.json')
  if (fs.existsSync(siteFile)) {
    const site = JSON.parse(fs.readFileSync(siteFile, 'utf8'))
    if (site.url) return String(site.url).replace(/\/$/, '')
  }

  return 'https://tekkisma.es'
}

export function absoluteUrl(value, siteUrl = getSiteUrl()) {
  if (!value) return null
  const raw = String(value).trim()
  if (!raw) return null
  if (/^https?:\/\//i.test(raw)) return raw
  return `${siteUrl}${raw.startsWith('/') ? raw : `/${raw}`}`
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}
