import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import 'font-awesome/css/font-awesome.min.css'

import plugin from "@/plugins";
import store from "@/stores"

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})
// app.use(createPinia())
app.use(store)
// 引入FastCrud
app.use(plugin)

app.mount('#app')
