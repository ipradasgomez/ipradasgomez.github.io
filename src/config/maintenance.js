/** Runtime maintenance — localStorage `mnt` overrides public/mnt.js default. */

export const MNT_STORAGE_KEY = 'mnt'

const ON = new Set(['true', '1', 'yes', 'on'])
const OFF = new Set(['false', '0', '2', 'no', 'off'])

export function parseMnt(value) {
  if (value === null || value === undefined) return null
  const normalized = String(value).trim().toLowerCase()
  if (ON.has(normalized)) return true
  if (OFF.has(normalized)) return false
  return null
}

function readSiteDefault() {
  if (typeof window === 'undefined') return false
  const raw = window.__SITE_MNT__
  if (typeof raw === 'boolean') return raw
  return parseMnt(raw) ?? false
}

/** Resolved mode: ls override first, then mnt.js default. */
export function resolveMaintenanceMode() {
  if (typeof window === 'undefined') return false

  const stored = parseMnt(localStorage.getItem(MNT_STORAGE_KEY))
  if (stored !== null) return stored

  return readSiteDefault()
}

/** Set at first paint by the inline script in index.html. */
export function isMaintenanceMode() {
  if (typeof window !== 'undefined' && typeof window.__MNT_ACTIVE__ === 'boolean') {
    return window.__MNT_ACTIVE__
  }
  return resolveMaintenanceMode()
}

/** Console helper: setMaintenanceOverride(true | false | null) then reload. */
export function setMaintenanceOverride(value) {
  if (value === null || value === undefined) {
    localStorage.removeItem(MNT_STORAGE_KEY)
    return
  }
  localStorage.setItem(MNT_STORAGE_KEY, value ? '1' : '0')
}

export function clearMaintenanceShell() {
  document.documentElement.classList.remove('mnt')
  document.getElementById('mnt-shell')?.remove()
}
