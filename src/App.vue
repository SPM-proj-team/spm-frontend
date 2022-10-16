<template>

  <MainNavbar />
  <router-view />
  <MainFooter/>
  
</template>

<script>

import MainNavbar from './components/MainNavbar.vue'
import MainFooter from './components/MainFooter.vue'


export default {

  components: {
    MainNavbar, MainFooter
  },
  mounted(){
    document.body.classList.add('bg-light')
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
}



</style>
