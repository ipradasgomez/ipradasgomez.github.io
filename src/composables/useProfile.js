import { ref, onMounted } from 'vue'
import { fetchJson } from '../api/fetchJson'

const profile = ref(null)
const loading = ref(true)
const error = ref(null)

let loadPromise = null

export function useProfile() {
  onMounted(async () => {
    if (profile.value) {
      loading.value = false
      return
    }

    if (!loadPromise) {
      loadPromise = fetchJson('/data/profile.json')
        .then((data) => {
          profile.value = data
        })
        .catch((err) => {
          error.value = err
        })
        .finally(() => {
          loading.value = false
        })
    }

    await loadPromise
  })

  return { profile, loading, error }
}
