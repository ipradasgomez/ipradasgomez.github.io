<script setup>

import { computed } from 'vue'

import { useLocale } from '../../composables/useLocale'

import { formatDate } from '../../utils/formatDate'

import { blogPostMark } from '../../utils/blogPostMark'

import Tag from '../ui/Tag.vue'



const props = defineProps({

  post: { type: Object, required: true },

  index: { type: Number, default: 0 },

})



const { t, tr } = useLocale()



const previewSrc = computed(

  () => props.post.previewImage ?? props.post.coverImage ?? null,

)

const mark = computed(() => blogPostMark(tr(props.post.title), props.post.slug))

const markEnd = computed(() => props.index % 2 === 1)
</script>



<template>

  <RouterLink
    :to="`/blog/${post.slug}`"
    class="blog-post-row group"
    :class="markEnd ? 'blog-post-row--mark-end' : 'blog-post-row--mark-start'"
  >

    <div class="blog-post-row__mark" aria-hidden="true">

      <span class="blog-post-row__aura" />

      <span

        class="blog-post-row__glyph"

        :style="{ '--mark-rotate': `${mark.rotation}deg` }"

      >{{ mark.letter }}</span>

      <span class="blog-post-row__glow" />

    </div>



    <div class="blog-post-row__content">

      <div class="blog-post-row__main">

        <div class="blog-post-row__meta">

          <span class="text-meta">

            {{ formatDate(post.date) }}

          </span>

          <span v-if="tr(post.readingTime)" class="font-mono text-xs text-ink-subtle">

            {{ tr(post.readingTime) }} {{ t('blog.reading_time') }}

          </span>

        </div>



        <h2 class="blog-post-row__title title-row">{{ tr(post.title) }}</h2>



        <p v-if="tr(post.summary)" class="blog-post-row__excerpt">

          {{ tr(post.summary) }}

        </p>



        <div class="blog-post-row__footer">

          <div v-if="post.tags?.length" class="flex flex-wrap gap-2">

            <Tag v-for="tag in post.tags" :key="tag">{{ tag }}</Tag>

          </div>

          <span class="blog-post-row__cta">{{ t('blog.read_more') }} →</span>

        </div>

      </div>



      <figure v-if="previewSrc" class="blog-post-row__thumb">

        <img

          :src="previewSrc"

          :alt="tr(post.title)"

          class="h-full w-full object-cover"

          loading="lazy"

        />

      </figure>

    </div>

  </RouterLink>

</template>


