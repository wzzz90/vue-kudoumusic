<template>
  <div class="rank-info-content plist-info">
    <div class="rank-banner-wrap"
         :style="{backgroundImage: `url(${imgurl})`}">
    </div>
    
    <div class="plist-desp container">
      <p class="plist-desp-p" :class="{'plist-desp-hide': hideDesp }">{{desp}}</p>
      <img src="../assets/images/close_icon.png" alt="" @click="hideDesp = !hideDesp" class="plist-desp-icon" v-show="hideDesp">
      <img src="../assets/images/open_icon.png" alt="" @click="hideDesp = !hideDesp" class="plist-desp-icon" v-show="!hideDesp">
    </div>
    <div class="plist-desp-bottom" style="width: 100%;height: 5px;background-color: #f1f1f1"></div>
    
    <div class="rank-info-list plist-info-list">
      <mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playSong(index)" :key="index">
        <img src="../assets/images/download_icon.png" width="20" height="20">
      </mt-cell>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        imgurl: '',
        title: '',
        songList: [],
        updateTime: '',
        desp: '',
        hideDesp: true,
        opacity: 0,
      }
    },

    activated() {
      this.$store.commit('showHead', true)
      this.getList()
      window.onscroll = () => {
        this.opacity = window.pageYOffset / 250
        this.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${this.opacity})`})
      }
    },
    
    deactivated(){
      this.$store.commit('showHead', false)
      window.onscroll = null
    },
    
    methods: {
      async getList(){
        
        try{
          let { data } = await this.$http.get(`/proxy/plist/list/${this.$route.query.id}?json=true`)
          const info = data.info.list
          const list = data.list.list.info

          this.songList = list
          this.imgurl = info.imgurl.replace('{size}', '400')
          this.desp = info.intro
          this.$store.commit('setHeadTitle', info.specialname)        	
        }catch(e){
          console.log(e)
        	//TODO handle the exception
        }

      }
    }
  }
</script>

<style scoped>
  .rank-banner-wrap {
    height: 250px;
    background-size: 100%
  }

</style>

