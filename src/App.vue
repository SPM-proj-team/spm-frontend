<template>
  <div id="page-top">
    <div id="wrapper">
      <NavbarMain/>
      <router-view />
    </div>
  </div>
  <!-- <MainNavbar /> -->
  


 




</template>

<script>

// import MainNavbar from './components/MainNavbar.vue'
import NavbarMain from './components/NavbarMain.vue';

export default {

  components: {
    // MainNavbar,
    NavbarMain
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
