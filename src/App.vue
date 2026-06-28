<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AppNav from './components/layout/AppNav.vue'
import AppFooter from './components/layout/AppFooter.vue'
import { useLocale } from './composables/useLocale'
import { formatPageTitle } from './utils/pageMeta'

const route = useRoute()
const { locale, t } = useLocale()

watch(
  [() => route.name, locale],
  () => {
    const name = route.name
    if (name === 'blog-post') return
    const page = name && name !== 'home' ? t(`nav.${name}`) : null
    document.title = formatPageTitle(page)
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNav />
    <main class="site-main flex-1">
      <RouterView v-slot="{ Component }">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          leave-active-class="transition duration-150 ease-in"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>
