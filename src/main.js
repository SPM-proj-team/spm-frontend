import { createApp } from 'vue'
import App from './App.vue'
import './scss/main.scss'
import 'bootstrap/dist/js/bootstrap.js'
import router from './router'


createApp(App).use(router).use(router).mount('#app')
