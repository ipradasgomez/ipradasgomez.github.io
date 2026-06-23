<script setup>
import { computed } from 'vue'
import { useProfile } from '../../composables/useProfile'
import { useLocale } from '../../composables/useLocale'
import BrandMark from '../ui/BrandMark.vue'

const { profile } = useProfile()
const { t } = useLocale()

const year = new Date().getFullYear()

const links = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/experience', key: 'experience' },
  { to: '/blog', key: 'blog' },
  { to: '/contact', key: 'contact' },
]
const navLinks = computed(() => links.map((l) => ({ ...l, label: t(`nav.${l.key}`) })))
</script>

<template>
  <footer class="mt-24 border-t border-line">
    <div class="mx-auto max-w-content px-6 py-12">
      <div class="grid gap-10 md:grid-cols-[1.5fr,1fr,1fr]">
        <div>
          <RouterLink to="/" class="group inline-flex items-center gap-2.5">
            <BrandMark
              size="sm"
              label="Tekkisma"
              class="transition-transform duration-280 group-hover:-rotate-6"
            />
            <span class="text-sm font-semibold tracking-tight text-ink">Tekkisma</span>
          </RouterLink>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <nav>
          <p class="kicker mb-3">{{ t('footer.nav') }}</p>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.key">
              <RouterLink
                :to="link.to"
                class="link-underline text-sm text-ink-muted hover:text-ink"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div v-if="profile">
          <p class="kicker mb-3">{{ t('nav.contact') }}</p>
          <ul class="space-y-2 text-sm text-ink-muted">
            <li>
              <a
                class="link-underline hover:text-ink"
                :href="`mailto:${profile.person.email}`"
              >
                {{ profile.person.email }}
              </a>
            </li>
            <li>
              <a
                class="link-underline hover:text-ink"
                :href="profile.person.linkedin.url"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                class="link-underline hover:text-ink"
                :href="profile.person.github.url"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="font-mono">© {{ year }} tekkisma.es</p>
        <p>{{ t('footer.built') }}</p>
      </div>
    </div>
  </footer>
</template>
