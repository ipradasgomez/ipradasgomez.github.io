<script setup>
import { watchEffect } from 'vue'
import { useProfile } from '../composables/useProfile'
import HeroSection from '../components/home/HeroSection.vue'
import ValueSection from '../components/home/ValueSection.vue'
import ExperienceSection from '../components/home/ExperienceSection.vue'
import SiteFooter from '../components/home/SiteFooter.vue'

const { profile, loading, error } = useProfile()

watchEffect(() => {
  if (profile.value?.meta?.title) {
    document.title = profile.value.meta.title
  }
})
</script>

<template>
  <div class="min-h-screen bg-neutral-950 text-slate-100">
    <div class="pointer-events-none fixed inset-x-0 top-0 -z-10 h-64 overflow-hidden md:h-72">
      <div class="absolute -top-28 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl" />
    </div>

    <main v-if="profile" class="relative isolate mx-auto max-w-6xl px-5 pb-12 pt-8 md:px-10 md:pt-14">
      <HeroSection :profile="profile" />
      <ValueSection :value="profile.value" />
      <ExperienceSection :experience="profile.experience" :stack="profile.stack" />
    </main>

    <SiteFooter v-if="profile" :profile="profile" />

    <div v-else-if="loading" class="flex min-h-screen items-center justify-center">
      <p class="text-sm text-slate-400">Cargando…</p>
    </div>

    <div v-else-if="error" class="flex min-h-screen items-center justify-center px-6">
      <p class="text-center text-sm text-red-400">No se pudo cargar el perfil.</p>
    </div>
  </div>
</template>
