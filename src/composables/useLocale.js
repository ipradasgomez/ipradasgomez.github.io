import { ref } from 'vue'
import { messages } from '../i18n/messages'

const STORAGE_KEY = 'tekkisma-locale'
export const VISIBLE_LOCALES = ['es', 'en']
export const LOCALE_CYCLE = ['es', 'en', 'gf']

function contentLocale(code) {
  return code === 'gf' ? 'en' : code
}

function isValidLocale(code) {
  return LOCALE_CYCLE.includes(code)
}

function detectInitial() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && isValidLocale(saved)) return saved
  }
  if (typeof navigator !== 'undefined') {
    const nav = navigator.language?.slice(0, 2)
    if (VISIBLE_LOCALES.includes(nav)) return nav
  }
  return 'es'
}

function applyDocumentLocale(code) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = contentLocale(code)
  document.documentElement.classList.toggle('locale-gallifreyan', code === 'gf')
}

// Module-level singleton so locale is shared across every component.
const locale = ref(detectInitial())
applyDocumentLocale(locale.value)

export function useLocale() {
  function setLocale(next) {
    if (!isValidLocale(next) || next === locale.value) return
    locale.value = next
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, next)
    applyDocumentLocale(next)
  }

  function cycleLocale(direction) {
    const index = LOCALE_CYCLE.indexOf(locale.value)
    if (index === -1) return
    const next = LOCALE_CYCLE[(index + direction + LOCALE_CYCLE.length) % LOCALE_CYCLE.length]
    setLocale(next)
  }

  function toggle() {
    setLocale(locale.value === 'es' ? 'en' : 'es')
  }

  // Resolve a UI string by dotted path (e.g. 'nav.about').
  function t(path) {
    const dict = messages[contentLocale(locale.value)] ?? messages.es
    const value = path
      .split('.')
      .reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), dict)
    return value ?? path
  }

  // Localize a content field that may be { es, en } or a plain value.
  function tr(field) {
    const code = contentLocale(locale.value)
    if (field && typeof field === 'object' && ('es' in field || 'en' in field)) {
      return field[code] ?? field.es ?? field.en ?? ''
    }
    return field
  }

  return {
    locale,
    visibleLocales: VISIBLE_LOCALES,
    cycleLocale,
    setLocale,
    toggle,
    t,
    tr,
  }
}
