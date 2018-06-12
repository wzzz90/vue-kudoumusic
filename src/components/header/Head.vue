<template>
  <section class="header">
    <HeadLogo />
    <RankHead v-if="head.toggle" :title="head.title" :cStyle="head.style" />
    <HeadNav v-else />  
  </section>
</template>

<script>
  import HeadNav from './HeadNav.vue'
  import HeadLogo from './HeadLogo.vue'
  import RankHead from './RankHead'
  import { mapGetters } from 'vuex'
  
  export default {
   name: 'HEAD',
   components: {
     HeadLogo,
     HeadNav,
     RankHead
   },
   computed: {
      ...mapGetters(['head'])
   },
   
  }
</script>

<style>
</style>