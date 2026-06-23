<script setup>
import { useProfile } from '../composables/useProfile'
import { useLocale } from '../composables/useLocale'
import SectionHeading from '../components/ui/SectionHeading.vue'
import RevealBlock from '../components/ui/RevealBlock.vue'
import Card from '../components/ui/Card.vue'
import Tag from '../components/ui/Tag.vue'

const { profile } = useProfile()
const { t, tr } = useLocale()
</script>

<template>
  <section v-if="profile" class="mx-auto max-w-content px-6 pt-16 sm:pt-20">
    <RevealBlock>
      <SectionHeading
        :index="t('sections.about.index')"
        :kicker="t('sections.about.kicker')"
        :title="t('nav.about')"
      >
        {{ tr(profile.about.lead) }}
      </SectionHeading>
    </RevealBlock>

    <div class="mt-12 grid gap-12 lg:grid-cols-[1.4fr,1fr] lg:gap-16">
      <RevealBlock :delay="80" class="space-y-5">
        <p
          v-for="(para, i) in tr(profile.about.paragraphs)"
          :key="i"
          class="text-base leading-relaxed text-ink-muted"
        >
          {{ para }}
        </p>
      </RevealBlock>

      <RevealBlock :delay="160" class="space-y-3">
        <Card
          v-for="highlight in profile.about.highlights"
          :key="tr(highlight.title)"
          tag="article"
        >
          <p class="text-sm font-semibold text-ink">{{ tr(highlight.title) }}</p>
          <p class="mt-2 text-sm leading-relaxed text-ink-muted">
            {{ tr(highlight.description) }}
          </p>
        </Card>
      </RevealBlock>
    </div>

    <RevealBlock :delay="120" class="mt-16">
      <p class="kicker">{{ t('stack.title') }}</p>
      <div class="mt-6 grid gap-8 sm:grid-cols-3">
        <div v-for="group in profile.stack" :key="tr(group.group)">
          <p class="font-mono text-xs uppercase tracking-wider text-ink-subtle">
            {{ tr(group.group) }}
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <Tag v-for="item in group.items" :key="item">{{ item }}</Tag>
          </div>
        </div>
      </div>
    </RevealBlock>
  </section>
</template>
