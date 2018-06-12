<template>
  <div class="audio-view" :class="{'audio_panel_hide':toggleHide}">
  	<audio :src="audio.songUrl" autoplay id="audioPlay" @timeupdate="change" @ended="next" @error="next"></audio>
  	<div class="audio-panel-control" @click="togglePanel" :class="{'toggleContral':toggleHide}">
  		<mt-spinner type="snake" :size="27" v-show="audioLoadding"></mt-spinner>
  	</div>
  	<div class="audio-panel">
  	  <img :src="audio.imgUrl" class="player-img" @click="showDetailPlayer"/>
  		<div class="player-status" @click="showDetailPlayer">
  			<p class="player-title ellipsis">{{audio.title}}</p>
        <p class="player-singer ellipsis">{{audio.singer}}</p>
  		</div>
  		<div class="player-controls">
  			<span class="player-Play" @click="toggleStatus()" :class="{'player-Pause':isPlay}"></span>
        <span class="player-nextSong" @click="next()"></span>
  		</div>
  	</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        toggleHide: false
      }
    },
    computed: {
      ...mapGetters(['audio', 'audioLoadding', 'showPlayer', 'isPlay'])
    },
    methods: {
      togglePanel() {
        this.toggleHide = !this.toggleHide;
      },
      
      toggleStatus() {
        if(this.isPlay) {
          document.getElementById("audioPlay").pause();
        } else {
          document.getElementById("audioPlay").play()
        }
        this.$store.commit('isPlay', !this.isPlay)
      },
      
      showDetailPlayer() {
        console.log(this.showPlayer)
        if (this.showPlayer) {
          this.$store.commit('showDetailPlayer', true);
        }
      },
      
      change(){
        const time = document.getElementById('audioPlay').currentTime
        if (this.audio.currentFlag) {
          document.getElementById('audioPlay').currentTime = this.audio.currentLength;
          this.$store.commit('setCurrent', false);
        } else {
          this.$store.commit('setAudioTime', time);
        }
      },
      
      next() {
        this.$store.dispatch('next');
      }
    }
  }
</script>

<style scoped>
  .audio-view {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: all .5s;
    -webkit-transition: all .5s;
  }
  .audio-panel-control {
    width: .35rem;
    height: .35rem;
    border-radius: 50%;
    background: rgba(0,0,0,.8) url(../assets/images/close_icon.png) no-repeat center;
    background-size: 25px;
    margin-left: .1rem;
    margin-bottom: .1rem;
    overflow: hidden;
  }
  .toggleContral {
    background: rgba(0,0,0,.8) url(../assets/images/open_icon.png) no-repeat center;
    background-size: 25px !important;
  }
  .audio-panel {
    z-index: 999;
    width: 100%;
    height: .64rem;
    background-color: rgba(0,0,0,0.8);
    padding: .07rem;
  }
  .audio_panel_hide {
    bottom: -.64rem;
}
  .player-img {
    height: 100%;
    float: left;
    border-radius: .02rem;
  }
  .player-status {
    float: left;
    width: 50%;
    height: 100%;
    margin-left: 3%;
    padding: .05rem 0;
    color: #fff;
}
.player-title {
  width: 100%;
  font-size: .16rem;
  overflow: hidden;
  display: block;
}
.player-singer {
  display: block;
  height: 50%;
  width: 100%;
  color: #c4c4c4;
  padding-top: .02rem;
  font-size: .14rem;
}
.player-controls {
    width: 30%;
    float: right;
    height: 100%;
}
.player-controls span {
    display: block;
    width: 50%;
    height: 100%;
    float: left;
}

</style>