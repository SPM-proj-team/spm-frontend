// Set Up Vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia"


// Import Font Awesome Icons

// import the fontawesome core 
import { library } from '@fortawesome/fontawesome-svg-core';

// import font awesome icon component 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// import specific icons 
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

// add icons to the library 
library.add(faUserSecret);

const app = createApp(App);

app.use(createPinia())
app.use(router)

// mount font awesome to Vue App
app.component('font-awesome-icon', FontAwesomeIcon)


app.mount('#app');


    
