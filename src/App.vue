<template>

  <MainNavbar v-if="this.store.staff_id" />
  <router-view />
  <MainFooter v-if="this.store.staff_id"/>
  
</template>

<script>

import MainNavbar from './components/MainNavbar.vue'
import MainFooter from './components/MainFooter.vue'
import { userStore } from './store'

export default {
  setup() {
    const store  = userStore();

    return { store }
  },

  components: {
    MainNavbar, MainFooter
  },
  mounted(){
    document.body.classList.add('bg-light')

    // check if user logged in
    if (this.store.staff_id === null){
      this.$router.push({name: 'Login'})
    }

    
  }

}

</script>

<style>


* {
    font-family: 'Poppins', sans-serif;
}

.router-link {
  text-decoration: none;
  color: inherit
}

.logo {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 5px;
    text-align: center;
}

html,body, #app {
  height:100%
}

</style>
