<template>
  <mainNavbar/>
  <div class="container m-auto py-5">
    <HelloWorld />
    <h1 class="text-green-400 text-center py-3">Green 500</h1>
  </div>
  
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import mainNavbar from './components/mainNavbar.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    mainNavbar
}
}
</script>

<style>


</style>
