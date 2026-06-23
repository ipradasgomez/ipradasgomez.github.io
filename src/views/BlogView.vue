<script setup>
import { computed, ref, onMounted } from 'vue'
import { fetchJson } from '../api/fetchJson'
import { useLocale } from '../composables/useLocale'
import SectionHeading from '../components/ui/SectionHeading.vue'
import RevealBlock from '../components/ui/RevealBlock.vue'
import BlogTagCloud from '../components/blog/BlogTagCloud.vue'
import BlogPostRow from '../components/blog/BlogPostRow.vue'

const { t, tr } = useLocale()
const posts = ref([])
const loaded = ref(false)
const activeTag = ref(null)

const allTags = computed(() => {
  const tags = new Set()
  for (const post of posts.value) {
    for (const tag of post.tags ?? []) tags.add(tag)
  }
  return [...tags].sort((a, b) => a.localeCompare(b))
})

const filteredPosts = computed(() => {
  if (!activeTag.value) return posts.value
  return posts.value.filter((post) => post.tags?.includes(activeTag.value))
})

const showTagCloud = computed(() => allTags.value.length > 0)

onMounted(async () => {
  try {
    posts.value = await fetchJson('/data/posts.json')
  } catch {
    posts.value = []
  } finally {
    loaded.value = true
  }
})

function selectTag(tag) {
  activeTag.value = tag
}
</script>

<template>
  <section class="page-section">
    <RevealBlock>
      <SectionHeading
        :index="t('sections.blog.index')"
        :kicker="t('sections.blog.kicker')"
        :title="t('nav.blog')"
      />
    </RevealBlock>

    <template v-if="loaded && posts.length">
      <RevealBlock v-if="showTagCloud" :delay="60" class="mt-10">
        <BlogTagCloud
          :tags="allTags"
          :active-tag="activeTag"
          :all-label="t('blog.filter_all')"
          @select="selectTag"
        />
      </RevealBlock>

      <div class="blog-list mt-10">
        <RevealBlock
          v-for="(post, i) in filteredPosts"
          :key="post.slug || tr(post.title)"
          :delay="80 + i * 70"
        >
          <BlogPostRow :post="post" :index="i" />
        </RevealBlock>

        <RevealBlock v-if="!filteredPosts.length" :delay="80">
          <div class="blog-empty-filter py-16 text-center">
            <p class="font-mono text-sm text-accent">{{ t('blog.filter_empty_kicker') }}</p>
            <p class="mt-3 text-sm text-ink-muted">{{ t('blog.filter_empty_body') }}</p>
            <button
              type="button"
              class="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-accent transition hover:text-brand-300"
              @click="selectTag(null)"
            >
              {{ t('blog.filter_all') }}
            </button>
          </div>
        </RevealBlock>
      </div>
    </template>

    <RevealBlock v-else-if="loaded" :delay="80" class="mt-12">
      <div class="empty-state">
        <p class="font-mono text-sm text-accent">~/blog</p>
        <h2 class="title-empty mt-4">{{ t('blog.empty_title') }}</h2>
        <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
          {{ t('blog.empty_body') }}
        </p>
      </div>
    </RevealBlock>
  </section>
</template>
