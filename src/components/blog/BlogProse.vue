<script setup>
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  content: { type: String, default: '' },
})

marked.setOptions({
  gfm: true,
  breaks: false,
})

const html = computed(() => {
  if (!props.content?.trim()) return ''
  return marked.parse(props.content, { async: false })
})
</script>

<template>
  <div
    v-if="html"
    class="blog-prose prose prose-lg prose-invert mx-auto max-w-prose"
    v-html="html"
  />
</template>
