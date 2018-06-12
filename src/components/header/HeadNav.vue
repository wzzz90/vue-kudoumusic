<template>
  <div class="header-nav">
    <mt-navbar v-model="headNav">
      <mt-tab-item :id="'head-nav' + index" v-for="(item, index) in headNavList" :key="index">{{item}}</mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script>
  export default {
    name: 'HeadNav',
    data() {
      return {
        //headNav: 'head-nav0',
        headNavList: ['新歌', '排行', '歌单', '歌手']
      }
    },
    computed: {
      headNav: {
        get(){
          return this.$store.getters.headNav
        },
        
        set(nav) {
          const index = nav.substr(-1)
          this.$store.commit('setHeadNav', nav)
          this.goRouter(Number(index))
        }
      }
    },
    methods: {
      goRouter(index){
        switch (index) {
          case 0:
            this.$router.push({path: '/'});
            break;
          case 1:
            this.$router.push({path: '/rank'});
            break;
          case 2:
            this.$router.push({path: '/plist'});
            break;
          case 3:
            this.$router.push({path: '/singer'});
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .header-nav {
    position: fixed;
    top: .5rem;
    left: 0;
    width: 100%;
    z-index: 1000;
    border-bottom: 1px solid #e4e4e4;
  }
</style>