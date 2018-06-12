<template>
  <div class="rank-info-content">
    <div class="rank-banner-wrap" :style="{backgroundImage:'url('+ imgurl + ')'}">
      <div class="rank-status container">
        <p>上次更新时间：{{getToday}}</p>
      </div>
    </div>
    
    <div class="rank-info-list">
      <mt-cell v-for="(item, index) in songList" :title="item.filename" @click.native="playSong(index)" :key="index">
        <span class="rank-index" :class="{'rank-list-good' : index<3, 'rank-list-first' : index==0, 'rank-list-second' : index==1, 'rank-list-third' : index==2}">{{index + 1}}</span>
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
        songList: [],
        updateTime: '',
        opacity: 0
      }
    },

    activated () {
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
    
    computed: {
      getToday(){
        const time = new Date()
        const year = time.getFullYear()
        let month = time.getMonth() + 1
        let date = time.getDate()
        
        if(month < 10) month = '0' + month
        if(date < 10) date = '0' + date
        
        return `${year}-${month}-${date}`
      },
    },
    
    methods: {
      
      async getList(){
        try {
          let { data } = await this.$http.get(`/proxy/rank/info/?rankid=${this.$route.query.id}&page=1&json=true`)
          const {info, songs} = data
          const {banner7url, rankname} = info
          const {list} = songs
          
          this.imgurl = banner7url.replace('{size}', '400')
          this.songList = list
          this.$store.commit('setHeadTitle', rankname)
        } catch(e) {
          console.log(e)
        }
        
      }
    }
  }
</script>

<style>

</style>

