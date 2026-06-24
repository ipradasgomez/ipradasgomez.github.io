<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  size: {
    type: String,
    default: 'sm', // sm | md | lg | xl
  },
  label: {
    type: String,
    default: 'Ismael',
  },
  decorative: {
    type: Boolean,
    default: false,
  },
})

const attrs = useAttrs()

const sizeClass = computed(() => {
  const map = {
    sm: 'h-8 w-5',
    md: 'h-14 w-9',
    lg: 'h-[7.5rem] w-12',
    xl: 'h-48 w-[7.5rem] sm:h-64 sm:w-40 md:h-80 md:w-48',
  }
  return map[props.size] ?? map.sm
})

const alt = computed(() => (props.decorative ? '' : props.label))
</script>

<template>
  <img
    src="/favicon.svg"
    :alt="alt"
    :class="['shrink-0 object-contain', sizeClass, attrs.class]"
  />
</template>
