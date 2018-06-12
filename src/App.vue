<template>
  <div id="app">
    <Head />
    <div class="main">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>    
    <Player />
    <DetailPlayer />
  </div>
</template>

<script>
  import Head from '@/components/header/Head'
  import Player from '@/components/Player'
  import DetailPlayer from '@/components/DetailPlayer'
  
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
