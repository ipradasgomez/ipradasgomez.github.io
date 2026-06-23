import { ref } from 'vue'
import { messages } from '../i18n/messages'

const STORAGE_KEY = 'tekkisma-locale'
const SUPPORTED = ['es', 'en']

function detectInitial() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && SUPPORTED.includes(saved)) return saved
  }
  if (typeof navigator !== 'undefined') {
    const nav = navigator.language?.slice(0, 2)
    if (SUPPORTED.includes(nav)) return nav
  }
  return 'es'
}

// Module-level singleton so locale is shared across every component.
const locale = ref(detectInitial())

if (typeof document !== 'undefined') {
  document.documentElement.lang = locale.value
}

export function useLocale() {
  function setLocale(next) {
    if (!SUPPORTED.includes(next) || next === locale.value) return
    locale.value = next
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, next)
    if (typeof document !== 'undefined') document.documentElement.lang = next
  }

  function toggle() {
    setLocale(locale.value === 'es' ? 'en' : 'es')
  }

  // Resolve a UI string by dotted path (e.g. 'nav.about').
  function t(path) {
    const dict = messages[locale.value] ?? messages.es
    const value = path
      .split('.')
      .reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), dict)
    return value ?? path
  }

  // Localize a content field that may be { es, en } or a plain value.
  function tr(field) {
    if (field && typeof field === 'object' && ('es' in field || 'en' in field)) {
      return field[locale.value] ?? field.es ?? field.en ?? ''
    }
    return field
  }

  return { locale, supported: SUPPORTED, setLocale, toggle, t, tr }
}
