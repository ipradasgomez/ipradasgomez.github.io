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
  <RevealBlock tag="footer" :delay="40" class="mt-10 border-t border-slate-900 bg-neutral-950 md:mt-12">
    <div class="mx-auto grid max-w-6xl gap-7 px-5 py-8 md:grid-cols-3 md:px-10 md:py-10">
      <div>
        <p class="text-sm font-semibold text-white">{{ profile.person.name }}</p>
        <p class="mt-2 text-sm text-slate-400">{{ profile.footer.tagline }}</p>
      </div>

      <div>
        <p class="text-sm font-semibold text-white">Contacto</p>
        <div class="mt-2 space-y-1 text-sm text-slate-400">
          <p>
            <a class="hover:text-brand-300" :href="`mailto:${profile.hero.email}`">
              {{ profile.hero.email }}
            </a>
          </p>
          <p>
            <a
              class="hover:text-brand-300"
              :href="profile.hero.linkedin.url"
              target="_blank"
              rel="noreferrer"
            >
              {{ profile.hero.linkedin.label }}
            </a>
          </p>
        </div>
      </div>

      <div class="hidden md:block">
        <p class="text-sm font-semibold text-white">Perfil técnico</p>
        <div class="mt-2 space-y-1 text-sm text-slate-400">
          <p v-for="skill in profile.footer.skills" :key="skill">{{ skill }}</p>
        </div>
      </div>
    </div>
  </RevealBlock>
</template>
