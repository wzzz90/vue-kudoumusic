// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import Mint from 'mint-ui'
import axios from './utils/ajax.js'
import Play from './mixins'
import directives from './directives'
import 'mint-ui/lib/style.css'
//import './assets/css/neat-min.css'
//import './assets/css/style.css'
import './style/common.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(Mint)
Vue.use(directives)
Vue.mixin(Play)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
