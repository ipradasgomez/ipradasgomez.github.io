function normalizeAlpha(text) {
  return String(text)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
}

export function hashString(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) {
    h = Math.imul(31, h) + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

/** First two alphabetic chars → middle letter in a–z (e.g. "bi" → e). */
export function midAlphabeticLetter(title) {
  const letters = normalizeAlpha(title).match(/[a-z]/g)
  const first = letters?.[0] ?? 'a'
  const second = letters?.[1] ?? first
  const a = first.charCodeAt(0) - 97
  const b = second.charCodeAt(0) - 97
  const mid = Math.round((a + b) / 2)
  return String.fromCharCode(97 + Math.min(25, Math.max(0, mid)))
}

export function markRotationDeg(seed, min = -14, max = 14) {
  const span = max - min + 1
  return min + (hashString(seed) % span)
}

export function blogPostMark(title, slug = '') {
  return {
    letter: midAlphabeticLetter(title),
    rotation: markRotationDeg(slug || title),
  }
}
