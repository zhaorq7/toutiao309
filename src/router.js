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
        }, {
        // 引发 :展示当前位置   面包屑
          path: 'comment',
          // 返回 Promise 的函数
          // ()=> import('./views/comment')
          component: () => import('./views/comment')
        }, {
          path: 'material',
          component: () => import('./views/material')
        }, {
          path: 'account',
          component: () => import('./views/account')
        }
      ]
    }
  ]
})
