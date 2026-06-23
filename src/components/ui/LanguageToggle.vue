<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLocale, VISIBLE_LOCALES } from '../../composables/useLocale'

const HINT_KEY = 'tekkisma-locale-hint-seen'

const { locale, cycleLocale, setLocale, t } = useLocale()
const peeking = ref(false)
let peekTimer = null

const isGfExpanded = computed(() => locale.value === 'gf')

function isActive(code) {
  return locale.value === code
}

function labelClass(code) {
  return code === 'gf' ? 'locale-switcher__gf' : 'locale-switcher__code'
}

function isHintDismissed() {
  return typeof localStorage !== 'undefined' && localStorage.getItem(HINT_KEY) === '1'
}

function dismissHint() {
  if (typeof localStorage !== 'undefined') localStorage.setItem(HINT_KEY, '1')
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function triggerPeek() {
  if (isHintDismissed() || locale.value === 'gf' || prefersReducedMotion()) return

  peeking.value = false
  requestAnimationFrame(() => {
    peeking.value = true
    clearTimeout(peekTimer)
    peekTimer = setTimeout(() => {
      peeking.value = false
    }, 1150)
  })
}

watch(locale, (next, prev) => {
  if (next === 'gf') {
    dismissHint()
    return
  }
  if (
    prev &&
    prev !== next &&
    VISIBLE_LOCALES.includes(prev) &&
    VISIBLE_LOCALES.includes(next)
  ) {
    triggerPeek()
  }
})

onMounted(() => {
  if (!isHintDismissed() && locale.value !== 'gf' && !prefersReducedMotion()) {
    peekTimer = setTimeout(() => triggerPeek(), 1200)
  }
})

onBeforeUnmount(() => clearTimeout(peekTimer))

function onKeydown(event) {
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    cycleLocale(1)
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    cycleLocale(-1)
  }
}
</script>

<template>
  <div
    class="locale-switcher inline-flex items-center rounded-full border border-line bg-surface-muted p-0.5 font-mono text-xs outline-none transition-[border-color,box-shadow] duration-280"
    :class="[
      isGfExpanded ? 'border-accent/35 locale-switcher--expanded' : '',
      peeking ? 'locale-switcher--peek' : '',
    ]"
    role="group"
    tabindex="0"
    :aria-label="t('locale.label')"
    @keydown="onKeydown"
  >
    <button
      v-for="code in VISIBLE_LOCALES"
      :key="code"
      type="button"
      class="locale-switcher__btn relative z-10 shrink-0 rounded-full px-2.5 py-0 uppercase tracking-wide transition-colors duration-280"
      :class="[
        labelClass(code),
        isActive(code)
          ? 'bg-accent text-surface font-semibold'
          : 'text-ink-subtle hover:text-ink',
      ]"
      :aria-pressed="isActive(code)"
      @click="setLocale(code)"
    >
      {{ code }}
    </button>

    <button
      type="button"
      class="locale-switcher__btn locale-switcher__btn--gf relative z-10 rounded-full py-0 uppercase tracking-wide transition-colors duration-280"
      :class="[
        labelClass('gf'),
        isGfExpanded ? 'locale-switcher__btn--gf-open' : '',
        isActive('gf')
          ? 'bg-accent text-surface font-semibold'
          : 'text-ink-subtle hover:text-ink',
      ]"
      :aria-pressed="isActive('gf')"
      :aria-hidden="!isGfExpanded"
      :tabindex="isGfExpanded ? 0 : -1"
      @click="setLocale('gf')"
    >
      gf
    </button>

    <span v-if="!isGfExpanded" class="locale-switcher__ghost" aria-hidden="true">gf</span>
  </div>
</template>
