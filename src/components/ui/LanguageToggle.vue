<script setup>
import { useLocale } from '../../composables/useLocale'

const { locale, supported, setLocale, t } = useLocale()
</script>

<template>
  <div
    class="inline-flex items-center rounded-full border border-line bg-surface-muted p-0.5 font-mono text-xs"
    role="group"
    :aria-label="t('locale.label')"
  >
    <button
      v-for="code in supported"
      :key="code"
      type="button"
      class="rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors duration-280"
      :class="
        locale === code
          ? 'bg-accent text-surface font-semibold'
          : 'text-ink-subtle hover:text-ink'
      "
      :aria-pressed="locale === code"
      @click="setLocale(code)"
    >
      {{ code }}
    </button>
  </div>
</template>
