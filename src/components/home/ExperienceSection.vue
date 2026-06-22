<script setup>
import RevealBlock from './RevealBlock.vue'

defineProps({
  experience: {
    type: Array,
    required: true,
  },
  stack: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[1fr,1fr]">
    <RevealBlock :delay="40">
      <h3 class="text-xl font-semibold text-white">Trayectoria</h3>
      <div class="mt-4 space-y-5 border-l border-brand-600/40 pl-4 md:mt-5 md:pl-5">
        <article v-for="item in experience" :key="item.role">
          <p class="text-sm font-semibold text-white">{{ item.role }}</p>
          <p class="text-xs text-brand-300">{{ item.period }}</p>
          <p v-if="item.note" class="mt-1 text-xs text-slate-400">{{ item.note }}</p>
        </article>
      </div>
    </RevealBlock>

    <RevealBlock :delay="120">
      <h3 class="text-xl font-semibold text-white">Stack principal</h3>
      <div class="mt-4 flex flex-wrap gap-2 md:mt-5">
        <span
          v-for="tech in stack"
          :key="tech"
          class="rounded-full border border-brand-600/40 bg-brand-500/10 px-3 py-1 text-xs text-brand-100"
        >
          {{ tech }}
        </span>
      </div>
    </RevealBlock>
  </section>
</template>
