<script setup>
import { computed } from 'vue'
import { useLocale } from '../../composables/useLocale'

const props = defineProps({
  item: { type: Object, required: true },
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle'])

const { t, tr } = useLocale()

const hasDetails = computed(() => (props.item.highlights?.length ?? 0) > 0)

const groupedHighlights = computed(() => {
  const groups = { action: [], achievement: [] }
  for (const entry of props.item.highlights ?? []) {
    const bucket = entry.type === 'achievement' ? 'achievement' : 'action'
    groups[bucket].push(entry)
  }
  return groups
})

function typeLabel(type) {
  return type === 'achievement' ? t('experience.type_achievement') : t('experience.type_action')
}

function onToggle() {
  emit('toggle')
}
</script>

<template>
  <article
    class="experience-entry"
    :class="{ 'experience-entry--open': open }"
    :id="`experience-${item.slug}`"
  >
    <div class="experience-entry__summary">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 class="text-lg font-bold text-ink">{{ tr(item.role) }}</h2>
        <span
          v-if="item.current"
          class="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-accent"
        >
          {{ t('experience.current') }}
        </span>
      </div>

      <p class="mt-1 text-sm font-medium text-accent-soft">{{ item.company }}</p>
      <p class="mt-1 font-mono text-xs text-ink-subtle">{{ tr(item.period) }}</p>

      <p v-if="tr(item.description)" class="mt-3 max-w-prose text-sm leading-relaxed text-ink-muted">
        {{ tr(item.description) }}
      </p>

      <button
        v-if="hasDetails"
        type="button"
        class="experience-entry__toggle mt-4"
        :aria-expanded="open"
        :aria-controls="`experience-details-${item.slug}`"
        @click="onToggle"
      >
        <span>{{ open ? t('experience.collapse') : t('experience.expand') }}</span>
        <svg
          class="experience-entry__toggle-icon"
          :class="{ 'experience-entry__toggle-icon--open': open }"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="open && hasDetails"
        :id="`experience-details-${item.slug}`"
        class="experience-entry__details"
        role="region"
        :aria-label="tr(item.role)"
      >
        <div class="experience-entry__details-rail" aria-hidden="true" />

        <template v-for="type in ['action', 'achievement']" :key="type">
          <div v-if="groupedHighlights[type].length" class="experience-entry__group">
            <p class="text-meta">{{ typeLabel(type) }}</p>
            <div class="accent-rule--sm mt-3" aria-hidden="true" />
            <ul class="experience-entry__list">
              <li v-for="(entry, idx) in groupedHighlights[type]" :key="idx">
                {{ tr(entry.text) }}
              </li>
            </ul>
          </div>
        </template>

        <button type="button" class="experience-entry__collapse link-back mt-6" @click="onToggle">
          <svg
            class="link-back__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          {{ t('experience.collapse') }}
        </button>
      </div>
    </Transition>
  </article>
</template>
