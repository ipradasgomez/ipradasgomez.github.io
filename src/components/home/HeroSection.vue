<script setup>
import RevealBlock from './RevealBlock.vue'

defineProps({
  profile: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RevealBlock tag="section" class="relative overflow-hidden rounded-2xl border border-brand-500/30 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-6 shadow-2xl shadow-brand-900/40 md:rounded-3xl md:p-12">
    <div class="absolute right-0 top-0 hidden h-56 w-56 translate-x-16 -translate-y-16 rounded-full border border-brand-500/30 md:block" />

    <div class="grid items-center gap-8 lg:grid-cols-[1.3fr,0.7fr]">
      <div>
        <div class="mb-5 flex items-center gap-3 md:hidden">
          <img
            :src="profile.person.avatar"
            :alt="`Foto de perfil de ${profile.person.name}`"
            class="h-14 w-14 rounded-xl border border-brand-400/40 object-cover"
          />
          <div>
            <p class="text-base font-semibold text-white">{{ profile.person.name }}</p>
            <p class="text-xs font-medium text-brand-200">{{ profile.person.title }}</p>
          </div>
        </div>

        <p class="inline-flex rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">
          {{ profile.hero.badge }}
        </p>

        <h1 class="mt-5 text-2xl font-bold leading-tight text-white md:text-5xl">
          {{ profile.hero.headline }}
        </h1>

        <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          {{ profile.hero.description }}
        </p>

        <div class="mt-4 flex flex-wrap gap-2 text-xs text-slate-300 md:hidden">
          <span class="rounded-full border border-slate-700 bg-neutral-900/90 px-3 py-1">{{ profile.person.location }}</span>
          <span class="rounded-full border border-slate-700 bg-neutral-900/90 px-3 py-1">{{ profile.person.contacts }} contactos</span>
          <span class="rounded-full border border-slate-700 bg-neutral-900/90 px-3 py-1">{{ profile.person.followers }} seguidores</span>
        </div>

        <div class="mt-7 flex flex-wrap gap-3">
          <a
            class="cta-glow rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            :href="`mailto:${profile.hero.email}`"
          >
            Hablemos: {{ profile.hero.email }}
          </a>
          <a
            class="hover-lift rounded-xl border border-slate-700 bg-neutral-900 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-brand-500/50"
            :href="profile.hero.linkedin.url"
            target="_blank"
            rel="noreferrer"
          >
            {{ profile.hero.linkedin.label }}
          </a>
        </div>
      </div>

      <aside class="hover-lift hidden rounded-2xl border border-slate-800/80 bg-neutral-900/80 p-6 lg:block">
        <img
          :src="profile.person.avatar"
          :alt="`Foto de perfil de ${profile.person.name}`"
          class="h-20 w-20 rounded-2xl border border-brand-400/30 object-cover"
        />
        <p class="mt-4 text-lg font-semibold text-white">{{ profile.person.name }}</p>
        <p class="text-sm text-brand-200">{{ profile.person.title }}</p>

        <div class="mt-5 space-y-3 text-sm text-slate-300">
          <p class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span>Ubicación</span>
            <span>{{ profile.person.location }}</span>
          </p>
          <p class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span>Contactos</span>
            <span>{{ profile.person.contacts }}</span>
          </p>
          <p class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span>Seguidores</span>
            <span>{{ profile.person.followers }}</span>
          </p>
          <p class="flex items-center justify-between">
            <span>Perfil</span>
            <a
              class="text-brand-300 hover:text-brand-200"
              :href="profile.person.github.url"
              target="_blank"
              rel="noreferrer"
            >
              @{{ profile.person.github.handle }}
            </a>
          </p>
        </div>
      </aside>
    </div>
  </RevealBlock>
</template>
