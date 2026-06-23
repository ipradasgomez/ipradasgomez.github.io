<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../../composables/useLocale'
import LanguageToggle from '../ui/LanguageToggle.vue'
import BrandMark from '../ui/BrandMark.vue'

const route = useRoute()
const { t } = useLocale()
const open = ref(false)

const links = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/experience', key: 'experience' },
  { to: '/blog', key: 'blog' },
  { to: '/contact', key: 'contact' },
]

const navLinks = computed(() =>
  links.map((link) => ({
    ...link,
    label: t(`nav.${link.key}`),
    index: t(`sections.${link.key}.index`),
  })),
)

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b border-line bg-surface/80 backdrop-blur-md"
  >
    <nav class="mx-auto flex h-16 max-w-content items-center justify-between px-6">
      <RouterLink
        to="/"
        class="group inline-flex items-center gap-2.5"
        aria-label="Tekkisma — inicio"
      >
        <BrandMark
          size="sm"
          label="Tekkisma"
          class="transition-transform duration-280 group-hover:-rotate-6"
        />
        <span class="text-sm font-semibold tracking-tight text-ink">
          Tekkisma
        </span>
      </RouterLink>

      <ul class="hidden items-center gap-1 md:flex">
        <li v-for="link in navLinks" :key="link.key">
          <RouterLink
            :to="link.to"
            class="group inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-ink-muted transition-colors duration-280 hover:text-ink"
            active-class="!text-ink"
            exact-active-class="!text-ink"
          >
            <span class="font-mono text-[0.65rem] text-accent">{{ link.index }}</span>
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <div class="hidden items-center gap-3 md:flex">
        <LanguageToggle />
      </div>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink md:hidden"
        :aria-expanded="open"
        aria-label="Menú"
        @click="open = !open"
      >
        <svg
          v-if="!open"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </nav>

    <Transition
      enter-active-class="transition duration-280 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="open"
        class="border-t border-line bg-surface/95 px-6 py-4 backdrop-blur-md md:hidden"
      >
        <ul class="flex flex-col gap-1">
          <li v-for="link in navLinks" :key="link.key">
            <RouterLink
              :to="link.to"
              class="flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-ink-muted transition-colors duration-280 hover:bg-surface-muted hover:text-ink"
              active-class="!text-ink bg-surface-muted"
              exact-active-class="!text-ink bg-surface-muted"
            >
              <span class="font-mono text-xs text-accent">{{ link.index }}</span>
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
        <div class="mt-4 border-t border-line pt-4">
          <LanguageToggle />
        </div>
      </div>
    </Transition>
  </header>
</template>
