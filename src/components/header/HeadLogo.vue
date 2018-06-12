<template>
  <div class="logo-container">
  	<div class="head-logo">
  		<img src="http://m.kugou.com/v3/static/images/index/logo.png">
  	</div>
  	<div class="head-search" @click="goSearchPage">
  		<img src="http://m.kugou.com/v3/static/images/index/search.png">
  	</div>
  </div>
</template>

<script>
  export default {
    name: 'HeadLogo',
    data() {
      return {
        
      }
    },
    methods: {
      goSearchPage() {
        this.$router.push('/search')
      }
    }
  }
</script>

<style scoped>
  .logo-container {
    padding: .1rem;
    background-color: #2CA2F9;
    overflow: hidden;
    height: .5rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1050;
    display: flex;
    justify-content: space-between;
  } 
  .head-logo, .head-search {
    height: 100%;
  }
  .head-logo img, .head-search img{
    display: inherit;
    height: 100%;
  }
  .head-search {
    height: .3rem;
    padding: .03rem 0;
  }
</style>