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
    <h1 class="title-section mt-4">
      {{ title }}
      <span class="text-accent">.</span>
    </h1>
    <p v-if="$slots.default" class="text-body mt-4">
      <slot />
    </p>
  </header>
</template>
