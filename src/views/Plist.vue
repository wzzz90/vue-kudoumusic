<template>
  <div class="plist">
    <mt-cell v-for="(item, index) in list" :title="item.specialname" is-link
             :label="String(item.playcount)" :to="`/plist/detail?id=${item.specialid}`" :key="index">
      <img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60" v-images>
    </mt-cell>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        list: []
      }
    },
    mounted(){
      this.getList()
    },
    methods: {
      async getList(){
        try {
          let { data } = await this.$http.get('/proxy/plist/index&json=true')
          this.list = data.plist.list.info 
        } catch (e) {
          console.log(e)
        }
      },
    }
  }
</script>
<style>
  .mint-cell:first-child .mint-cell-wrapper {
    background-origin: border-box;
  }
  .plist .mint-cell-wrapper {
    padding: .1rem .05rem;
  }
	.plist .mint-cell-text {
    position: absolute;
    left: .9rem;
    top: .23rem;
    padding-right: .2rem;
    height: .16rem;
    overflow: hidden;
    line-height: .16rem;
  }
  .plist .mint-cell-label {
    position: absolute;
    left: .9rem;
    top: .38rem;
  }
  .plist .mint-cell-label:before {
    content: '';
    display: inline-block;
    width: .12rem;
    height: .12rem;
    background: url(../assets/images/icon_music.png) no-repeat center;
    background-size: 100%;
  }
</style>

