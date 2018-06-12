<template>
  <div class="rank-head container" :style="cStyle" id="transparent-header">
    <a class="rank-head-back" @click="routerBack"></a>
    {{title}}
  </div>
</template>

<script>
  export default {
    props: ['title', 'to', 'cStyle'],
    methods: {
      routerBack(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style>
.rank-head {
    width: 100%;
    height: 43px;
    position: fixed;
    background: -webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0));
    top: 51px;
    z-index: 999;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 43px;
}	
.rank-head-back {
    display: block;
    float: left;
    width: 24px;
    height: 100%;
    background: url(../../assets/images/goback_icon.png) no-repeat center;
    background-size: 60% 60%;
    position: absolute;
    left: 5px;
    top: 0;
}
</style>
