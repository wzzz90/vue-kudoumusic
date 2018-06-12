import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state = {
  headNav: 'head-nav0',
  listInfo: {
    songList: [],
    songIndex: 0
  },
  head: {
    toggle: false,
    title: '',
    style: {'background': 'rgba(43,162,251,0)'}
  },
  audioLoadding: false,
  listenCount: 0,
  showPlayer: false,
  detailPlayerFlag: false,
  isPlay: true,
  audio: {
    songUrl: '',
    imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
    title: '',
    singer: '',
    currentLength: 0,
    songLength: 0,
    currentFlag: false
  },
}

const getters = {
  headNav: state => state.headNav,
  audioLoadding: state => state.audioLoadding,
  showPlayer: state => state.showPlayer,
  isPlay: state => state.isPlay,
  audio: state => state.audio,
  detailPlayerFlag: state => state.detailPlayerFlag,
  head: state => state.head
}

const actions = {
  getSong({commit, state}, hash) {
    commit('toggleAudioLoadding', true)
    
    axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(({data}) => {
      const songData = data.data
      let playAudio = {
        currentLength: 0
      };
      ({ play_url: playAudio.songUrl, img: playAudio.imgUrl, audio_name: playAudio.title, timelength: playAudio.songLength, author_name: playAudio.singer} = {...songData})
      playAudio.songLength = playAudio.songLength / 1000
    
      commit('setAudio', playAudio)
      commit('setLrc', songData.lyrics)
      commit('isPlay', true)
      commit('toggleAudioLoadding', false)      
    })

  },
  
  next({dispatch, state}) {
    let list = state.listInfo.songList;
    
    if(state.listInfo.songIndex == list.length - 1) {
      state.listInfo.songIndex = 0
    } else {
      state.listInfo.songIndex ++
    }

    let hash = list[state.listInfo.songIndex].hash
    dispatch('getSong', hash)
  },
  
  prev({dispatch, state}) {
    let list = state.listInfo.songList;
    console.log(state.listInfo.songIndex)
    if(state.listInfo.songIndex == 0) {
      state.listInfo.songIndex = list.length - 1
    } else {
      state.listInfo.songIndex --
    }

    let hash = list[state.listInfo.songIndex].hash
    dispatch('getSong', hash)
  }
}

const mutations = {
  setHeadNav(state, nav) {
    state.headNav = nav
  },
  
  setListInfo(state, {list, index}) {
    state.listInfo.songList = list
    state.listInfo.songIndex = index
  },
  
  toggleAudioLoadding(state, flag) {
    state.audioLoadding = flag
  },
  
  setAudio(state, playAudio) {
    if(!state.listenCount) {
      state.showPlayer = true  //首次进入应用时不可打开播放详情
    }
    
    state.listenCount ++
    state.audio = {...(state.audio), ...playAudio}
  },
  
  setLrc(state, lrc) {
    state.audio = {...(state.audio), lrc}
  },
  
  showPlayer(state, flag) {
    state.showPlayer = flag
  },
  
  isPlay(state, flag) {
    state.isPlay = flag
  },
  
  showDetailPlayer(state, flag) {
    state.detailPlayerFlag = flag
  },
  
  setAudioTime(state, time) {
    state.audio.currentLength = time
  },
  
  setCurrent(state, flag) {
    state.audio.currentFlag = flag
  },
  
  showHead(state, flag) {
    state.head.toggle = flag
    console.log(state.head.toggle)
  },
  
  setHeadTitle(state, title) {
    state.head.title = title
  },
  
  setHeadStyle(state, style) {
    state.head.style = style
  },
  
  resetHeadStyle(state) {
    state.head.style = {'background': 'rgba(43,162,251,0)'}
  },
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
