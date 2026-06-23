<script setup>
import { useProfile } from '../composables/useProfile'
import { useLocale } from '../composables/useLocale'
import RevealBlock from '../components/ui/RevealBlock.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BrandMark from '../components/ui/BrandMark.vue'

const { profile, loading, error } = useProfile()
const { t, tr } = useLocale()
</script>

<template>
  <section class="mx-auto max-w-content px-6">
    <div v-if="profile" class="relative">
      <div
        class="pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-[100px]"
      />

      <div
        class="grid items-start gap-12 pb-12 pt-16 sm:pt-24 lg:grid-cols-[1.55fr,0.85fr] lg:gap-16"
      >
        <div>
          <div class="flex items-start gap-6 sm:gap-8">
            <BrandMark
              size="lg"
              decorative
              class="hidden shrink-0 opacity-90 sm:mt-1 sm:block"
            />

            <div class="min-w-0 flex-1">
              <RevealBlock>
                <p class="kicker">
                  <span class="text-ink-subtle">{{ t('sections.home.index') }}</span>
                  <span class="text-line-strong">/</span>
                  <span>{{ t('sections.home.kicker') }}</span>
                </p>
              </RevealBlock>

              <RevealBlock :delay="40">
                <p class="kicker mt-3 flex items-center gap-2.5">
                  <BrandMark size="sm" decorative class="sm:hidden" />
                  <span>{{ t('hero.greeting') }} Ismael</span>
                </p>
              </RevealBlock>

              <RevealBlock :delay="80">
                <h1 class="display mt-5 text-ink">
                  {{ tr(profile.hero.title) }}
                </h1>
              </RevealBlock>

              <RevealBlock :delay="160">
                <p class="headline mt-6 max-w-2xl font-semibold text-ink-muted">
                  {{ tr(profile.hero.headline) }}
                </p>
              </RevealBlock>

              <RevealBlock :delay="240">
                <p class="mt-6 max-w-xl text-base leading-relaxed text-ink-subtle">
                  {{ tr(profile.hero.intro) }}
                </p>
              </RevealBlock>

              <RevealBlock :delay="320">
                <div class="mt-9 flex flex-wrap items-center gap-3">
                  <BaseButton variant="primary" to="/contact">
                    {{ t('cta.contact') }}
                    <span aria-hidden="true">→</span>
                  </BaseButton>
                  <BaseButton variant="ghost" to="/experience">
                    {{ t('cta.experience') }}
                  </BaseButton>
                </div>
              </RevealBlock>
            </div>
          </div>
        </div>

        <RevealBlock :delay="200" class="w-full justify-self-center lg:justify-self-end">
          <div class="mx-auto flex w-full max-w-[18rem] flex-col gap-6 sm:max-w-xs lg:mx-0 lg:max-w-none">
            <div class="relative mx-auto lg:mx-0">
              <div
                class="absolute -inset-3 -z-10 rounded-xl bg-gradient-to-tr from-accent/30 via-transparent to-transparent blur-xl"
              />
              <div
                class="overflow-hidden rounded-xl border border-line-strong bg-surface-elevated p-2 shadow-card"
              >
                <img
                  :src="profile.person.avatar"
                  :alt="`Ismael Pradas`"
                  class="h-56 w-56 rounded-lg object-cover sm:h-64 sm:w-64 lg:h-72 lg:w-72"
                  loading="eager"
                />
              </div>
            </div>

            <div
              class="rounded-lg border border-line bg-surface px-6 py-6 text-center lg:text-left"
            >
              <p class="display !text-4xl !leading-none text-accent sm:!text-5xl">
                {{ profile.heroSummary.value }}
              </p>
              <p class="mt-2 text-sm text-ink-muted">
                {{ tr(profile.heroSummary.label) }}
              </p>
              <p class="mt-5 font-mono text-xs text-ink-subtle">
                {{ tr(profile.person.location) }}
              </p>
              <p class="mt-2 font-mono text-xs">
                <a
                  class="link-underline text-ink-subtle hover:text-accent"
                  :href="profile.person.github.url"
                  target="_blank"
                  rel="noreferrer"
                  >@{{ profile.person.github.handle }}</a
                >
              </p>
            </div>
          </div>
        </RevealBlock>
      </div>
    </div>

    <div v-else-if="loading" class="flex min-h-[60vh] items-center justify-center">
      <p class="font-mono text-sm text-ink-subtle">Cargando…</p>
    </div>

    <div v-else-if="error" class="flex min-h-[60vh] items-center justify-center">
      <p class="text-sm text-brand-400">No se pudo cargar el perfil.</p>
    </div>
  </section>
</template>
