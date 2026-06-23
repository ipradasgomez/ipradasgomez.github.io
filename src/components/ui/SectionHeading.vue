<script setup>
defineProps({
  index: { type: String, default: '' },
  kicker: { type: String, default: '' },
  title: { type: String, required: true },
})
</script>

<template>
  <header class="max-w-prose">
    <p v-if="kicker || index" class="kicker">
      <span v-if="index" class="text-ink-subtle">{{ index }}</span>
      <span v-if="index && kicker" class="text-line-strong">/</span>
      <span v-if="kicker">{{ kicker }}</span>
    </p>
    <h1 class="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
      {{ title }}
      <span class="text-accent">.</span>
    </h1>
    <p v-if="$slots.default" class="mt-4 text-base leading-relaxed text-ink-muted">
      <slot />
    </p>
  </header>
</template>
