<script setup>
import { onMounted } from 'vue'
import App from './App.vue'
import MaintenanceView from './views/MaintenanceView.vue'
import { clearMaintenanceShell, isMaintenanceMode } from './config/maintenance'

const maintenance = isMaintenanceMode()

onMounted(() => {
  clearMaintenanceShell()
})
</script>

<template>
  <MaintenanceView v-if="maintenance" />
  <App v-else />
</template>
