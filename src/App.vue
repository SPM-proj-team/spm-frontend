<template>
  <mainNavbar/>
  <router-view/>
</template>

<script>

import MainNavbar from './components/MainNavbar.vue'

export default {
  
  components:{
    MainNavbar
  },
  
}

</script>

<style>

.router-link {
  text-decoration: none;
  color: inherit
}


</style>
