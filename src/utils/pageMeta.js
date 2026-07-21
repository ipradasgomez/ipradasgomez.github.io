const SITE_NAME = 'Tekkisma'

const DEFAULT = {
  title: SITE_NAME,
  description:
    'Lead Backend Engineer. Escalo plataformas de alto tráfico y equipos para convertir complejidad técnica en resultados de negocio.',
  canonical: 'https://tekkisma.es/',
  siteName: SITE_NAME,
  type: 'website',
  image: null,
}

/** "Tekkisma" on home; "Tekkisma — Sobre mí" (etc.) on inner pages. */
export function formatPageTitle(page) {
  if (!page) return SITE_NAME
  return `${SITE_NAME} — ${page}`
}

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function removeMeta(attr, key) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove()
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

function applyOpenGraph({ title, description, url, image, type, siteName }) {
  setMeta('property', 'og:site_name', siteName)
  setMeta('property', 'og:type', type)
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:url', url)
  if (image) {
    setMeta('property', 'og:image', image)
  } else {
    removeMeta('property', 'og:image')
  }

  const card = image ? 'summary_large_image' : 'summary'
  setMeta('name', 'twitter:card', card)
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', description)
  if (image) {
    setMeta('name', 'twitter:image', image)
  } else {
    removeMeta('name', 'twitter:image')
  }
}

export function applyPageMeta(meta = {}) {
  const title = meta.title ?? DEFAULT.title
  const description = meta.description ?? DEFAULT.description
  const canonical = meta.canonical ?? DEFAULT.canonical
  const url = meta.url ?? canonical
  const image = meta.image ?? DEFAULT.image
  const type = meta.type ?? DEFAULT.type
  const siteName = meta.siteName ?? DEFAULT.siteName

  document.title = title
  setMeta('name', 'description', description)
  setCanonical(canonical)
  applyOpenGraph({ title, description, url, image, type, siteName })
}

export function resetPageMeta() {
  applyPageMeta(DEFAULT)
}
