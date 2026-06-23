<script setup>
defineProps({
  tag: { type: String, default: 'div' },
  interactive: { type: Boolean, default: true },
})
</script>

<template>
  <component
    :is="tag"
    class="rounded-lg border border-line bg-surface-elevated/60 p-6 shadow-card backdrop-blur-sm"
    :class="interactive ? 'hover-lift' : ''"
  >
    <slot />
  </component>
</template>
