<script setup>

import { ref, watch, onMounted, onUnmounted, computed } from 'vue'

import { useRoute } from 'vue-router'

import { fetchJson } from '../api/fetchJson'

import { useLocale } from '../composables/useLocale'

import { formatDate } from '../utils/formatDate'

import { blogPostMark } from '../utils/blogPostMark'

import { applyPageMeta, resetPageMeta } from '../utils/pageMeta'

import BlogProse from '../components/blog/BlogProse.vue'

import RevealBlock from '../components/ui/RevealBlock.vue'

import Tag from '../components/ui/Tag.vue'



const route = useRoute()

const { t, tr } = useLocale()

const post = ref(null)

const loaded = ref(false)

const notFound = ref(false)



const mark = computed(() => {

  if (!post.value) return null

  return blogPostMark(tr(post.value.title), post.value.slug)

})



const pageMeta = computed(() => {

  if (!post.value?.share) return null

  return {

    title: `${tr(post.value.share.title)} — Ismael Pradas`,

    description: tr(post.value.share.description),

    canonical: post.value.share.url,

    url: post.value.share.url,

    image: post.value.share.image,

    type: 'article',

  }

})



async function loadPost(slug) {

  loaded.value = false

  notFound.value = false

  post.value = null



  try {

    post.value = await fetchJson(`/data/posts/${slug}.json`)

  } catch {

    notFound.value = true

  } finally {

    loaded.value = true

  }

}



onMounted(() => loadPost(route.params.slug))

onUnmounted(() => resetPageMeta())



watch(

  () => route.params.slug,

  (slug) => {

    if (slug) loadPost(slug)

  },

)



watch(

  pageMeta,

  (meta) => {

    if (meta) applyPageMeta(meta)

  },

  { immediate: true },

)

</script>



<template>

  <section class="blog-article mx-auto max-w-content px-6 pb-24 pt-16 sm:pt-20">

    <RevealBlock>

      <div class="blog-article__back-row">

        <RouterLink to="/blog" class="blog-article__back-link">

          <svg

            class="blog-article__back-icon"

            xmlns="http://www.w3.org/2000/svg"

            width="16"

            height="16"

            viewBox="0 0 24 24"

            fill="none"

            stroke="currentColor"

            stroke-width="2"

            stroke-linecap="round"

            stroke-linejoin="round"

            aria-hidden="true"

          >

            <path d="M19 12H5" />

            <path d="m12 19-7-7 7-7" />

          </svg>

          {{ t('blog.back') }}

        </RouterLink>

      </div>

    </RevealBlock>



    <template v-if="loaded && post">

      <figure v-if="post.coverImage" class="blog-article__cover">

        <img

          :src="post.coverImage"

          :alt="tr(post.title)"

          class="blog-article__cover-img"

          loading="eager"

        />

        <div class="blog-article__cover-fade" aria-hidden="true" />

      </figure>



      <RevealBlock>

        <header class="blog-article__hero">

          <div v-if="mark" class="blog-article__mark" aria-hidden="true">

            <span class="blog-article__glow" />

            <span

              class="blog-article__glyph"

              :style="{ '--mark-rotate': `${mark.rotation}deg` }"

            >{{ mark.letter }}</span>

          </div>



          <div class="blog-article__hero-inner">

            <p class="blog-article__meta">

              <span>{{ formatDate(post.date) }}</span>

              <span v-if="tr(post.readingTime)" class="blog-article__meta-sep">

                {{ tr(post.readingTime) }} {{ t('blog.reading_time') }}

              </span>

            </p>



            <h1 class="blog-article__title">{{ tr(post.title) }}</h1>



            <p v-if="post.author" class="blog-article__author">{{ post.author }}</p>



            <p v-if="tr(post.excerpt)" class="blog-article__lead">

              {{ tr(post.excerpt) }}

            </p>



            <div v-if="post.tags?.length" class="blog-article__tags">

              <Tag v-for="tag in post.tags" :key="tag">{{ tag }}</Tag>

            </div>

          </div>

        </header>

      </RevealBlock>



      <RevealBlock :delay="80">

        <div class="blog-article__body">

          <div class="blog-article__rail" aria-hidden="true" />

          <BlogProse :content="tr(post.body)" />

        </div>

      </RevealBlock>



      <RevealBlock :delay="120">

        <footer class="blog-article__footer">

          <RouterLink to="/blog" class="blog-article__back-link">

            <svg

              class="blog-article__back-icon"

              xmlns="http://www.w3.org/2000/svg"

              width="16"

              height="16"

              viewBox="0 0 24 24"

              fill="none"

              stroke="currentColor"

              stroke-width="2"

              stroke-linecap="round"

              stroke-linejoin="round"

              aria-hidden="true"

            >

              <path d="M19 12H5" />

              <path d="m12 19-7-7 7-7" />

            </svg>

            {{ t('blog.back') }}

          </RouterLink>

        </footer>

      </RevealBlock>

    </template>



    <RevealBlock v-else-if="loaded && notFound">

      <div class="blog-article__not-found">

        <p class="font-mono text-sm text-accent">404</p>

        <h2 class="title-empty mt-4">{{ t('blog.not_found_title') }}</h2>

        <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">

          {{ t('blog.not_found_body') }}

        </p>

        <RouterLink to="/blog" class="blog-article__back-link mt-8">

          <svg

            class="blog-article__back-icon"

            xmlns="http://www.w3.org/2000/svg"

            width="16"

            height="16"

            viewBox="0 0 24 24"

            fill="none"

            stroke="currentColor"

            stroke-width="2"

            stroke-linecap="round"

            stroke-linejoin="round"

            aria-hidden="true"

          >

            <path d="M19 12H5" />

            <path d="m12 19-7-7 7-7" />

          </svg>

          {{ t('blog.back') }}

        </RouterLink>

      </div>

    </RevealBlock>

  </section>

</template>


