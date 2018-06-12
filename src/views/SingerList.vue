<template>
  <div class="singer_list">
    <mt-cell v-for="(item, index) in list" :to="`/singer/detail?id=${item.singerid}`" is-link :title="item.singername" :key="index">
      <img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60" v-images />
    </mt-cell>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        list: [],
      }
    },
    
    activated(){
      this.$store.commit('showHead', true)
      this.$store.commit('setHeadStyle', {'background': '#2CA2F9'})
      this.getList();
      
    },
    
    deactivated(){
      this.$store.commit('showHead', false)
      this.$store.commit('resetHeadStyle')
    },
    
    methods: {
      async getList(){
        
        try{
        	let { data } = await this.$http.get(`/proxy/singer/list/${this.$route.query.id}?json=true`)
        	
        	this.list = data.singers.list.info
          this.$store.commit('setHeadTitle', data.classname)
        }catch(e){
        	//TODO handle the exception
        }
      }
    }
  }
</script>

<style>
  .singer_list .mint-cell-title img {
    margin-right: 10px
  }
</style>
