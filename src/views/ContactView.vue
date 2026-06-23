<script setup>
import { useProfile } from '../composables/useProfile'
import { useLocale } from '../composables/useLocale'
import SectionHeading from '../components/ui/SectionHeading.vue'
import RevealBlock from '../components/ui/RevealBlock.vue'

const { profile } = useProfile()
const { t, tr } = useLocale()
</script>

<template>
  <section v-if="profile" class="mx-auto max-w-content px-6 pt-16 sm:pt-20">
    <RevealBlock>
      <SectionHeading
        :index="t('sections.contact.index')"
        :kicker="t('sections.contact.kicker')"
        :title="t('nav.contact')"
      >
        {{ tr(profile.contact.lead) }}
      </SectionHeading>
    </RevealBlock>

    <RevealBlock :delay="100" class="mt-12">
      <a
        :href="`mailto:${profile.person.email}`"
        class="group inline-flex cursor-pointer items-baseline gap-3 text-2xl font-extrabold tracking-tight text-ink transition-colors duration-280 hover:text-accent sm:text-4xl"
      >
        {{ profile.person.email }}
        <span
          class="text-accent transition-transform duration-280 group-hover:translate-x-1"
          aria-hidden="true"
          >→</span
        >
      </a>
    </RevealBlock>

    <RevealBlock :delay="180" class="mt-12 max-w-md">
      <p class="kicker">{{ t('contact.social') }}</p>
      <ul class="mt-4 space-y-2">
        <li>
          <a
            class="link-underline text-base text-ink-muted hover:text-ink"
            :href="profile.person.linkedin.url"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn — @{{ profile.person.linkedin.handle }}
          </a>
        </li>
        <li>
          <a
            class="link-underline text-base text-ink-muted hover:text-ink"
            :href="profile.person.github.url"
            target="_blank"
            rel="noreferrer"
          >
            GitHub — @{{ profile.person.github.handle }}
          </a>
        </li>
      </ul>
    </RevealBlock>
  </section>
</template>
