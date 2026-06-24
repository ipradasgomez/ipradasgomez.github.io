import { createApp } from 'vue'
import AppShell from './AppShell.vue'
import router from './router'
import { setMaintenanceOverride } from './config/maintenance'
import './style.css'

globalThis.setMaintenanceOverride = setMaintenanceOverride

createApp(AppShell).use(router).mount('#app')
