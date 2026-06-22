/**
 * Load JSON from public/data/ (static "fake API").
 * Files in public/ are copied as-is to dist/ — no bundle bloat.
 */
export async function fetchJson(path) {
  const response = await fetch(path)
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`)
  }
  return response.json()
}
