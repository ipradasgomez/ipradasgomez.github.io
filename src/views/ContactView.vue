<script setup>
import { useProfile } from '../composables/useProfile'
import { useLocale } from '../composables/useLocale'
import SectionHeading from '../components/ui/SectionHeading.vue'
import RevealBlock from '../components/ui/RevealBlock.vue'

const { profile } = useProfile()
const { t, tr } = useLocale()
</script>

<template>
  <section v-if="profile" class="page-section">
    <RevealBlock>
      <SectionHeading
        :index="t('sections.contact.index')"
        :kicker="t('sections.contact.kicker')"
        :title="t('nav.contact')"
        accent-first
      />
    </RevealBlock>

    <RevealBlock :delay="100">
      <div class="contact-grid mt-12 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div class="contact-grid__primary">
          <p class="text-body max-w-lg sm:text-lg">
            {{ tr(profile.contact.lead) }}
          </p>

          <a
            :href="`mailto:${profile.person.email}`"
            class="text-emphasis group mt-8 inline-flex items-baseline gap-3 text-ink transition-colors duration-280 hover:text-accent"
          >
            {{ profile.person.email }}
            <span
              class="text-accent transition-transform duration-280 group-hover:translate-x-1"
              aria-hidden="true"
              >→</span
            >
          </a>
        </div>

        <div class="contact-grid__social">
          <p class="kicker">{{ t('contact.social') }}</p>
          <div class="accent-rule--md" aria-hidden="true" />
          <ul class="space-y-4">
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
        </div>
      </div>
    </RevealBlock>
  </section>
</template>
