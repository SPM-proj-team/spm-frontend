<template>

  <MainNavbar />
  <router-view />


 




</template>

<script>

import MainNavbar from './components/MainNavbar.vue'

export default {

  components: {
    MainNavbar
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



</style>
