import { execSync } from 'node:child_process'

const hasTinaCloud = Boolean(process.env.TINA_CLIENT_ID && process.env.TINA_TOKEN)
const branch =
  process.env.TINA_BRANCH || process.env.GITHUB_REF_NAME || 'main'

if (hasTinaCloud) {
  console.log(`Building Tina admin (Tina Cloud, branch: ${branch})…`)
  execSync('tinacms build --skip-cloud-checks', {
    stdio: 'inherit',
    env: { ...process.env, TINA_BRANCH: branch },
  })
} else {
  console.log(
    'Skipping tinacms build: set TINA_CLIENT_ID and TINA_TOKEN for production admin.',
  )
}

// Site content (blog, profile, etc.) always comes from the repo checkout below.
execSync('node scripts/generate-posts.mjs', { stdio: 'inherit' })
execSync('node scripts/generate-experience.mjs', { stdio: 'inherit' })
execSync('node scripts/generate-seo.mjs', { stdio: 'inherit' })
execSync('vite build', { stdio: 'inherit' })
execSync('cp dist/index.html dist/404.html', { stdio: 'inherit' })
execSync('node scripts/generate-post-og-pages.mjs', { stdio: 'inherit' })
