<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary | ghost | link
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
})

const tag = computed(() => {
  if (props.to) return 'RouterLink'
  if (props.href) return 'a'
  return 'button'
})

const variants = {
  primary:
    'cta-glow bg-accent text-surface hover:bg-brand-400 shadow-glow',
  ghost:
    'border border-line-strong text-ink hover:border-accent hover:text-accent bg-surface-muted',
  link: 'text-ink-muted hover:text-accent',
}

const classes = computed(() => {
  const base =
    'inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition duration-280'
  if (props.variant === 'link') {
    return `inline-flex cursor-pointer select-none items-center gap-2 text-sm font-medium transition duration-280 ${variants.link}`
  }
  return `${base} ${variants[props.variant] ?? variants.primary}`
})
</script>

<template>
  <component
    :is="tag"
    :to="to || undefined"
    :href="href || undefined"
    :class="classes"
  >
    <slot />
  </component>
</template>
