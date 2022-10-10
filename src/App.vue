<template>

    <Navbar/>
    <router-view/>

  
  <!-- <MainNavbar /> -->
  


 




</template>

<script>

import Navbar from './components/Navbar.vue';

export default {

  components: {
    Navbar
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
