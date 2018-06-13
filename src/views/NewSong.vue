<template>
  <div class="new-song">
    <mt-swipe :auto="5000">
      <mt-swipe-item v-for="(banner, index) in bannerList" :key="index">
        <a :href="banner.extra.tourl" target="_blank">
          <img :src="banner.imgurl" :title="banner.title" :alt="banner.title" v-images/>
        </a>
      </mt-swipe-item>
    </mt-swipe>
    
    <mt-cell v-for="(song, index) in songList" :key="index" :title="song.filename" @click.native="playSong(index)">
      <img src="../assets/images/download_icon.png" width="20" height="20" @click="downloadSong(index)" class="twenty"/>
    </mt-cell>
  </div>
</template>

<script>

  
  export default {
    data() {
      return {
        bannerList: [],
        songList: []
      }
    },
    mounted() {
      this.getNewSongData()
    },
    computed: {
      songUrl() {
        return this.$store.getters.audio.songUrl
      }
    },
    
    methods: {     
      async getNewSongData() {
        try{
        	let {data} = await this.$http.get('/proxy/?json=true')
        	this.bannerList = data.banner
        	this.songList = data.data
        }catch(e){
          console.log(e)
        	//TODO handle the exception
        }
      }
    }
    
  }
</script>

<style>
  .mint-swipe {
    height: 39vw !important;
  }
  
  .mint-swipe-indicator {
    width: .12rem !important;
    height: .12rem !important;
  }
  
  .mint-swipe-indicators {
    bottom: .05rem !important;
  }
</style>