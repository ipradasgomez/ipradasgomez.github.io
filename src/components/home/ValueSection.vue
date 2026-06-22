<script setup>
import RevealBlock from './RevealBlock.vue'

defineProps({
  value: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[1.2fr,0.8fr]">
    <RevealBlock
      :delay="80"
      class="rounded-2xl border border-slate-800/70 bg-neutral-900/40 p-5 md:rounded-3xl md:p-7"
    >
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">{{ value.eyebrow }}</p>
      <h2 class="mt-3 text-xl font-semibold text-white md:text-2xl">{{ value.title }}</h2>
      <p class="mt-4 text-sm leading-relaxed text-slate-300">{{ value.description }}</p>
    </RevealBlock>

    <div class="hidden gap-4 sm:grid-cols-2 lg:grid lg:grid-cols-1">
      <RevealBlock
        v-for="(highlight, index) in value.highlights"
        :key="highlight.title"
        tag="article"
        :delay="140 + index * 60"
        class="hover-lift rounded-2xl border border-slate-800 bg-neutral-900/70 p-5"
      >
        <p class="text-sm font-semibold text-brand-200">{{ highlight.title }}</p>
        <p class="mt-2 text-sm text-slate-300">{{ highlight.description }}</p>
      </RevealBlock>
    </div>
  </section>
</template>
