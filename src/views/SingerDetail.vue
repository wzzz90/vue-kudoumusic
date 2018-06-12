<template>
  <div class="rank-info-content plist-info">
  	<div class="rank-banner-wrap" :style="{backgroundImage: `url(${imgurl})`}"></div>
  	<div class="plist-desp container">
      <p class="plist-desp-p" :class="{'plist-desp-hide': hideDesc }">{{desc}}</p>
      <img src="../assets/images/close_icon.png" @click="hideDesc = !hideDesc" class="plist-desp-icon" v-show="hideDesc">
      <img src="../assets/images/open_icon.png" @click="hideDesc = !hideDesc" class="plist-desp-icon" v-show="!hideDesc">
    </div>
    <div class="plist-desp-bottom" style="width: 100%;height: 5px;background-color: #f1f1f1"></div>

    <div class="rank-info-list plist-info-list">
      <mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playSong(index)" :key="index">
        <img src="../assets/images/download_icon.png" width="20" height="20"/>
      </mt-cell>
    </div>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        imgurl: '',
        songList: [],
        updateTime: '',
        desc: '',
        hideDesc: true,
        opacity: 0
      }
    },
    activated() {
      console.log(this.$store)
      this.$store.commit('showHead', true)
      this.get()
      window.onscroll = ()=> {
        this.opacity = window.pageYOffset / 250
        this.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${this.opacity})`})
      }      
    },
    deactivated() {
      this.$store.commit('showHead', false)
      window.onscroll = null
    },
    
    methods: {
      async get(){
        
        try{
          let { data } = await this.$http.get(`/proxy/singer/info/${this.$route.query.id}&json=true`)
          this.imgurl = data.info.imgurl.replace('{size}', '400')
          this.desc = data.info.intro
          this.songList = data.songs.list
          this.$store.commit('setHeadTitle', data.info.singername)        	
        }catch(e){
          console.log(e)
        	//TODO handle the exception
        }
      },
    }
  }
</script>

<style>
</style>