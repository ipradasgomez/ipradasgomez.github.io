<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { fetchJson } from '../api/fetchJson'
import { useLocale } from '../composables/useLocale'
import SectionHeading from '../components/ui/SectionHeading.vue'
import RevealBlock from '../components/ui/RevealBlock.vue'
import ExperienceEntry from '../components/experience/ExperienceEntry.vue'

const { t } = useLocale()
const experience = ref([])
const loaded = ref(false)
const openSlug = ref(null)

onMounted(async () => {
  try {
    experience.value = await fetchJson('/data/experience.json')
  } catch {
    experience.value = []
  } finally {
    loaded.value = true
  }
})

async function toggleEntry(slug) {
  const closing = openSlug.value === slug
  openSlug.value = closing ? null : slug

  if (!closing) {
    await nextTick()
    const el = document.getElementById(`experience-${slug}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}
</script>

<template>
  <section v-if="loaded" class="page-section">
    <RevealBlock>
      <SectionHeading
        :index="t('sections.experience.index')"
        :kicker="t('sections.experience.kicker')"
        :title="t('nav.experience')"
        accent-first
      />
    </RevealBlock>

    <ol v-if="experience.length" class="experience-timeline mt-14 border-l border-line">
      <RevealBlock
        v-for="(item, i) in experience"
        :key="item.slug || item.company"
        tag="li"
        :delay="i * 90"
        class="experience-timeline__item relative pl-8 pb-12 last:pb-0 sm:pl-10"
      >
        <span
          class="experience-timeline__dot absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 border-surface transition duration-280"
          :class="item.current || openSlug === item.slug ? 'bg-accent' : 'bg-line-strong'"
        />

        <ExperienceEntry
          :item="item"
          :open="openSlug === item.slug"
          @toggle="toggleEntry(item.slug)"
        />
      </RevealBlock>
    </ol>
  </section>
</template>
