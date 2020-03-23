import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Register from './views/register'
import Home from './views/home'
import Main from './views/home/main'

Vue.use(Router)

// 导航守卫

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    }, {
      path: '/register',
      component: Register
    }, {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        }
      ]
    }
  ]
})
