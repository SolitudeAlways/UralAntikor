import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Импортируем CSS стили
import './assets/styles/variables.css'
import './assets/styles/common.css'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')