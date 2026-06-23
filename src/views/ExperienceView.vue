<script setup>
import { useProfile } from '../composables/useProfile'
import { useLocale } from '../composables/useLocale'
import SectionHeading from '../components/ui/SectionHeading.vue'
import RevealBlock from '../components/ui/RevealBlock.vue'

const { profile } = useProfile()
const { t, tr } = useLocale()
</script>

<template>
  <section v-if="profile" class="mx-auto max-w-content px-6 pt-16 sm:pt-20">
    <RevealBlock>
      <SectionHeading
        :index="t('sections.experience.index')"
        :kicker="t('sections.experience.kicker')"
        :title="t('nav.experience')"
      />
    </RevealBlock>

    <ol class="mt-14 border-l border-line">
      <RevealBlock
        v-for="(item, i) in profile.experience"
        :key="item.company"
        tag="li"
        :delay="i * 90"
        class="relative pl-8 pb-12 last:pb-0 sm:pl-10"
      >
        <span
          class="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 border-surface"
          :class="item.current ? 'bg-accent' : 'bg-line-strong'"
        />

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
        <p
          v-if="item.description"
          class="mt-3 max-w-prose text-sm leading-relaxed text-ink-muted"
        >
          {{ tr(item.description) }}
        </p>
      </RevealBlock>
    </ol>
  </section>
</template>
