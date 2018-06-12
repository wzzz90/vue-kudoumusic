<template>
  <div class="rank-list">
  	<mt-cell
  	  v-for="(song, index) in songList"
      :title="song.rankname"
      :to="`/rank/detail?id=${song.rankid}`"
      is-link
      :key="index">
      <img slot="icon" :src="song.imgurl.replace('{size}', '400')" width="60" height="60" v-images />
    </mt-cell>
  </div>
  
</template>

<script>
  
  export default {
    data() {
      return {
        songList: []
      }
    },
    mounted() {
      this.getRankList()
    },
    methods: {
      async getRankList() {
        try{
        	let {data} = await this.$http.get('/proxy/rank/list&json=true')
        	this.songList = data.rank.list
        }catch(e){
          console.log(e)
        	//TODO handle the exception
        }
      }
    }
  }
</script>

<style scoped>
  .rank .mint-cell-title img {
      margin-right: 10px;
  }
  .rank .mint-cell-wrapper{
      font-size: 16px;
  }  
</style>