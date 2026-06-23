/**
 * Clear Tina dev cache after schema changes (fixes stale admin / render errors).
 */
import fs from 'node:fs'
import path from 'node:path'

const cacheDir = path.join(process.cwd(), 'tina', '__generated__', '.cache')

if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true })
  console.log('Removed tina/__generated__/.cache')
} else {
  console.log('No Tina cache to remove.')
}
