<template>
  <div id="app">
    <router-view/>
    
  </div>
</template>

<script>
  import Head from '@/components/header/Head'
  import Player from '@/components/Player'
  import DetailPlayer from '@/components/DetailPlayer'
  import Auth from '@/views/auth'
  
  export default {
    name: 'App',
    components: {
      Head,
      Player,
      DetailPlayer
    }
  }
</script>

<style scoped>
  .main {
    margin-top: .91rem;
  }
</style>
