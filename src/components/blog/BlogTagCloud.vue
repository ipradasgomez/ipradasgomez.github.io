<script setup>
defineProps({
  tags: { type: Array, required: true },
  activeTag: { type: String, default: null },
  allLabel: { type: String, required: true },
})

const emit = defineEmits(['select'])
</script>

<template>
  <div class="blog-tag-cloud" role="group" :aria-label="allLabel">
    <button
      type="button"
      class="blog-tag-cloud__pill"
      :class="{ 'blog-tag-cloud__pill--active': !activeTag }"
      @click="emit('select', null)"
    >
      {{ allLabel }}
    </button>
    <button
      v-for="tag in tags"
      :key="tag"
      type="button"
      class="blog-tag-cloud__pill"
      :class="{ 'blog-tag-cloud__pill--active': activeTag === tag }"
      @click="emit('select', tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>
