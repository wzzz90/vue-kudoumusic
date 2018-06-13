<template>
  <div>
    <div class="search-panel">
      <div class="search-input">
        <span class="search-icon"></span>
        <input type="text" v-model="keyword" placeholder="歌手/歌名/拼音" @keydown.enter="search">
      </div>
      <a href="javascript:;" @click="search" class="search-btn serach-first">搜索</a>
      <a href="javascript:;" @click="cancel" class="search-btn">取消</a>
    </div>

    <div class="search-list" v-show="togglePanel">
      <div class="search-list-title">最近热门</div>
      <div class="hot-btn-container" style="display: flex;">
      	<mt-button size="small" type="default" v-for="(item,index) in hotList" @click.native="replaceInput(index)" :key="index">{{item.keyword}}</mt-button>
      </div>
    </div>

    <div class="songs-list" v-show="!togglePanel">
      <div class="search-total">
        共有{{total}}条搜索结果
      </div>
      <mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playSong(index)" :key="index">
        <img src="../assets/images/download_icon.png" width="20" height="20" />
      </mt-cell>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        keyword: '',
        hotList: [],
        togglePanel: true,
        total: null,
        songList: []
      }
    },
    
    mounted(){
      this.$store.commit('showHead', true)
      this.$store.commit('setHeadStyle', {'background': '#2CA2F9'})
      this.$store.commit('setHeadTitle', '搜索')
      this.getList()
    },
    
    activated() {
      this.$store.commit('showHead', true)
      this.$store.commit('setHeadStyle', {'background': '#2CA2F9'})
      this.$store.commit('setHeadTitle', '搜索')
      this.getList()
    },
    
    deactivated(){
      this.$store.commit('showHead', false)
      this.$store.commit('resetHeadStyle')
    },
    
    methods: {
      
      async getList(){
        
        try {
          let { data } = await this.$http.get('/aproxy/api/v3/search/hot?format=json&plat=0&count=30')
          this.hotList = data.data.info
          console.log(this.hotList)
        } catch (e) {
          console.log(e)
        }
      },
      
      replaceInput(index){
        this.keyword = this.hotList[index].keyword
        this.search()
      },
      
      cancel() {
        this.togglePanel = true
        this.songList = []
        this.total = null
        if(this.keyword) {
          this.keyword = ''
        } else {
          history.back()
        }
        
      },
      
      async search(){
        this.togglePanel = false
        if(this.keyword) {
          try{
          	let { data } = await this.$http.get(`/aproxy/api/v3/search/song?format=json&keyword=${this.keyword}&page=1&pagesize=30&showtype=1`)
          	this.songList = data.data.info
            this.total = data.data.total
          }catch(e){
          	//TODO handle the exception
          	console.log(e)
          }
        }
      }
    }
  }
</script>
<style scoped="scoped">
  .search-panel {
    padding: .1rem;
    background-color: #fbfbfb;
    height: .55rem;
    display: flex;
}
.search-input {
    width: 80%;
    height: 100%;
    display: block;
    border: 1px solid #e5e5e5;
    border-radius: 0.07rem;
    float: left;
    background-color: #fff;
    display: flex;
}
.search-icon {
    display: block;
    float: left;
    width: 10%;
    height: 100%;
    background: url(http://m.kugou.com/v3/static/images/index/search_icon.png) no-repeat center;
    background-size: auto 100%;
}
.search-input input {
    width: 90%;
    height: 100%;
    display: inline-block;
    padding: 0 .1rem 0 0;
    border: none;
    outline: none;
    background-color: transparent;
}
.hot-btn-container {
  display: flex;
  flex-wrap: wrap;
}
.hot-btn-container button {
/*  width: 30%;*/
}
.search-btn {
    display: block;
    height: 100%;
    width: 18%;
    background-color: #2ba2fa;
    float: right;
    border-radius: .07rem;
    color: #fff;
    font-size: .15rem;
    text-align: center;
    line-height: .35rem;
    border: none;
    outline: none;
}
	.search-list {
	  padding: .1rem;
	}
	.search-list-title {
    padding: .1rem;
    color: deepskyblue;
    font-size: .14rem;
}
	.search-list button {
	  margin: 0.1rem .1rem 0;
	}
	.serach-first {
	  margin: 0 .1rem;
	}
	.search-total {
    padding: .05rem .1rem;
    background-color: #e1e1e1;
    color: #484848;
    font-size: .14rem;
}
</style>
