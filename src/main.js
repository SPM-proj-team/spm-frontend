import { createApp } from 'vue'
import App from './App.vue'
import './scss/main.scss'
import "bootstrap/dist/js/bootstrap.js"
import router from './router'
import { createPinia } from "pinia"

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { 
    faHouse, 
    faUser, 
    faPlus, 
    faBook, 
    faLightbulb, 
    faChevronDown, 
    faChevronUp, 
    faListCheck, 
    faCircleUser, 
    faTrash, 
    faUserCheck,
    faCircleXmark,
    faCircleCheck,
    faHouseChimneyUser,
    faMagnifyingGlass,
    faUserXmark,
    faUserPlus,
    faCheck,
    faChevronLeft,
    faChevronRight

} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
    faHouse, 
    faUser, 
    faPlus, 
    faBook, 
    faLightbulb, 
    faChevronDown, 
    faChevronUp, 
    faListCheck, 
    faCircleUser, 
    faTrash, 
    faUserCheck, 
    faCircleXmark,
    faCircleCheck,
    faHouseChimneyUser,
    faMagnifyingGlass,
    faUserXmark,
    faUserPlus,
    faCheck,
    faChevronLeft,
    faChevronRight
)


createApp(App)
.use(createPinia())
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
