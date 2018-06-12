
const Play = {
  methods: {
    playSong(index) {
      let hash = this.songList[index].hash,
          info = {
            list: this.songList,
            index
          };

      this.$store.commit('setListInfo', info)
      this.$store.dispatch('getSong', hash)
    },
    
    // 解决403图片缓存问题
    getImages( _url ){
      if( _url !== undefined ){
        let _u = _url.substring( 7 );
        return 'https://images.weserv.nl/?url=' + _u;
      }
    },
    
    downloadSong(index) {
      return 
      const aElement = document.createElement('a')
      aElement.href = this.songUrl
      aElement.download = this.songList[index].filename
      
      aElement.click()
    },
  }
}

export default Play;

