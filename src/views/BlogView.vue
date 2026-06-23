<script setup>
import { ref, onMounted } from 'vue'
import { fetchJson } from '../api/fetchJson'
import { useLocale } from '../composables/useLocale'
import SectionHeading from '../components/ui/SectionHeading.vue'
import RevealBlock from '../components/ui/RevealBlock.vue'
import Card from '../components/ui/Card.vue'
import Tag from '../components/ui/Tag.vue'

const { t, tr } = useLocale()
const posts = ref([])
const loaded = ref(false)

onMounted(async () => {
  try {
    posts.value = await fetchJson('/data/posts.json')
  } catch {
    posts.value = []
  } finally {
    loaded.value = true
  }
})

function formatDate(value) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return value
  }
}
</script>

<template>
  <section class="mx-auto max-w-content px-6 pt-16 sm:pt-20">
    <RevealBlock>
      <SectionHeading
        :index="t('sections.blog.index')"
        :kicker="t('sections.blog.kicker')"
        :title="t('nav.blog')"
      />
    </RevealBlock>

    <div v-if="loaded && posts.length" class="mt-12 grid gap-5 sm:grid-cols-2">
      <RevealBlock
        v-for="(post, i) in posts"
        :key="post.slug || post.title"
        :delay="i * 80"
      >
        <Card tag="article" class="h-full">
          <p class="font-mono text-xs text-ink-subtle">{{ formatDate(post.date) }}</p>
          <h2 class="mt-2 text-lg font-bold text-ink">{{ tr(post.title) }}</h2>
          <p class="mt-2 text-sm leading-relaxed text-ink-muted">
            {{ tr(post.excerpt) }}
          </p>
          <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <Tag v-for="tag in post.tags" :key="tag">{{ tag }}</Tag>
          </div>
        </Card>
      </RevealBlock>
    </div>

    <RevealBlock v-else-if="loaded" :delay="80" class="mt-12">
      <div
        class="rounded-lg border border-dashed border-line-strong bg-surface-muted px-8 py-16 text-center"
      >
        <p class="font-mono text-sm text-accent">~/blog</p>
        <h2 class="mt-4 text-2xl font-bold text-ink">{{ t('blog.empty_title') }}</h2>
        <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
          {{ t('blog.empty_body') }}
        </p>
      </div>
    </RevealBlock>
  </section>
</template>
