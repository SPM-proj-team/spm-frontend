<template>

    <Topbar/>
    <router-view/>


</template>

<script>

import Topbar from './components/Topbar.vue';

export default {

  components: {
    Topbar
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
