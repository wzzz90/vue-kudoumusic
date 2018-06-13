import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const load = (view) => () => import(`@/views/${ view }`)

const Routes = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: load('layout'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'NewSong',
          component: load('NewSong')
        },
        {
          path: '/rank',
          name: 'Rank',
          component: load('Rank')
        },
        {
          path: '/plist',
          name: 'Plist',
          component: load('Plist')
        },
        {
          path: '/singer',
          name: 'Singer',
          component: load('Singer')
        },
        {
          path: '/singer/list',
          name: 'SingerList',
          component: load('SingerList')
        },
        {
          path: '/singer/detail',
          name: 'SingerDetail',
          component: load('SingerDetail')
        },
        {
          path: '/plist/detail',
          name: 'PlistDetail',
          component: load('PlistDetail')
        },
        {
          path: '/rank/detail',
          name: 'RankDetail',
          component: load('RankDetail')
        },
        {
          path: '/search',
          name: 'search',
          component: load('search')
        },        
      ]
    },
    {
      path: '/auth',
      name: 'Auth',
      component: load('auth') 
    },
  ]
})

Routes.beforeEach((to, from, next) => {
  let requiredAuth = !to.path.match(/\/(auth|errors)/)
  let authed = store.getters.users
  
  if(requiredAuth) {
    if (!authed.userName) {
      next('/auth')
    } else {
      if (to.matched.length === 0) {                                        //如果未匹配到路由
        from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
      } else {
        next();                                                                            //如果匹配到正确跳转
      }     
    }    
  } else {
    next()
  }

  switch (to.fullPath){
  	case '/rank':
  	  store.commit('setHeadNav', 'head-nav1')
  		break;
    case '/plist':
      store.commit('setHeadNav', 'head-nav2')
      break;
    case '/singer':
      store.commit('setHeadNav', 'head-nav3')
      break;
    case '/':
      store.commit('setHeadNav', 'head-nav0')
      break;
  }
   
  

});

export default Routes;
