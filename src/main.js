import { createApp } from 'vue'
import App from './App.vue'
import './scss/main.scss'
import "bootstrap/dist/js/bootstrap.js"
import router from './router'
import { createPinia } from "pinia"


createApp(App).use(createPinia()).use(router).mount('#app')
