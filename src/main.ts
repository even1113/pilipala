import '@/styles/index.scss'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// import piniaPluginPersist from 'pinia-plugin-persist' //引入pinia数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) //安装插件
app.use(router)
app.use(pinia)
app.mount('#app')

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
