import { execSync } from 'node:child_process'

const hasTinaCloud = Boolean(process.env.TINA_CLIENT_ID && process.env.TINA_TOKEN)

if (hasTinaCloud) {
  console.log('Building Tina admin (Tina Cloud)…')
  execSync('tinacms build', { stdio: 'inherit' })
} else {
  console.log(
    'Skipping tinacms build: set TINA_CLIENT_ID and TINA_TOKEN for production admin.',
  )
}

execSync('node scripts/generate-posts.mjs', { stdio: 'inherit' })
execSync('vite build', { stdio: 'inherit' })
execSync('cp dist/index.html dist/404.html', { stdio: 'inherit' })
