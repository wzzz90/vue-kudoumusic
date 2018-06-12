import axios from 'axios'
import { Indicator } from 'mint-ui'

axios.defaults.baseURL = '/'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// Request
axios.interceptors.request.use(function(request) {
  Indicator.open({
    text: '加载中...',
    spinnerType: 'snake'
  });
  
  return request
})

axios.interceptors.response.use(function (response) {
    Indicator.close()
  
  return response
}, function (error) {
  let {response} = error

  if (response.status === 403) {
    // 无权限
    store.commit('noPermision')
    consoel.log('无权限')
  } else if (response.status === 401) {
    if (!document.location.pathname.match(/\/auth/)) {
      //store.commit('login')
      console.log('登录')
    }
  } else if (response.status === 410) {
    console.log('410')
  }
  
  Indicator.close()
  return Promise.reject(error)
})

export default axios
