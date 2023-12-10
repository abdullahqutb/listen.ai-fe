import './assets/styles/main.css'
import './assets/styles/styles.scss'

import { setupValidationRules } from './helpers/validationRules'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/style.css'

setupValidationRules()
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
