// Set Up Vue

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia"

// import Prime Vue and Prime Flex
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';

// Import Font Awesome Icons

// import the fontawesome core 
import { library } from '@fortawesome/fontawesome-svg-core';

// import font awesome icon component 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// import specific icons 
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

// add icons to the library 
library.add(faUserSecret);

createApp(App)
    .use(createPinia())
    .use(router)
    .use(createPinia())
    .use(PrimeVue)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
