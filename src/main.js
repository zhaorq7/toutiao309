import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import Component from './components'
import './style/index.less'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseURL = 'http://localhost:3031'
Vue.prototype.$axios = axios // 全局使用

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

/*
* login
*
* 头部
* 左侧导航    右侧显示内容 (router-view 二级路由)
* */
