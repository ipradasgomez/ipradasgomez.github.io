<script setup>
import { useProfile } from '../composables/useProfile'
import { useLocale } from '../composables/useLocale'
import SectionHeading from '../components/ui/SectionHeading.vue'
import RevealBlock from '../components/ui/RevealBlock.vue'
import Tag from '../components/ui/Tag.vue'

const { profile } = useProfile()
const { t, tr } = useLocale()
</script>

<template>
  <section v-if="profile" class="page-section">
    <RevealBlock>
      <SectionHeading
        :index="t('sections.about.index')"
        :kicker="t('sections.about.kicker')"
        :title="t('nav.about')"
        accent-first
      >
        {{ tr(profile.about.lead) }}
      </SectionHeading>
    </RevealBlock>

    <div class="mt-12 grid gap-14 lg:grid-cols-[1.45fr,1fr] lg:gap-20">
      <RevealBlock :delay="80" class="about-narrative">
        <p
          v-for="(para, i) in tr(profile.about.paragraphs)"
          :key="i"
          class="text-body"
        >
          {{ para }}
        </p>
      </RevealBlock>

      <RevealBlock :delay="160">
        <ul class="about-highlights">
          <li
            v-for="highlight in profile.about.highlights"
            :key="tr(highlight.title)"
            class="about-highlight"
          >
            <p class="about-highlight__title">{{ tr(highlight.title) }}</p>
            <p class="about-highlight__desc">{{ tr(highlight.description) }}</p>
          </li>
        </ul>
      </RevealBlock>
    </div>

    <RevealBlock :delay="120" class="mt-20">
      <p class="kicker">{{ t('stack.title') }}</p>
      <div class="about-stack mt-8">
        <div
          v-for="group in profile.stack"
          :key="tr(group.group)"
          class="about-stack__group"
        >
          <p class="about-stack__label">{{ tr(group.group) }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <Tag v-for="item in group.items" :key="item">{{ item }}</Tag>
          </div>
        </div>

        <div v-if="profile.ai" class="about-stack__group">
          <p class="about-stack__label">{{ tr(profile.ai.title) }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <Tag v-for="item in profile.ai.items" :key="tr(item)">{{ tr(item) }}</Tag>
          </div>
        </div>

        <div v-if="profile.languages" class="about-stack__group">
          <p class="about-stack__label">{{ tr(profile.languages.title) }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <Tag v-for="item in profile.languages.items" :key="tr(item)">{{ tr(item) }}</Tag>
          </div>
        </div>
      </div>
    </RevealBlock>
  </section>
</template>
