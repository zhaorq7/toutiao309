import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import Component from './components'
import './style/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/axios.config'

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

/* 项目 需要  build  打包 */
/*
* vue-cli 脚手架   开发项目的    单文件组件.vue less  iompoert  属于中间过程
* 运行在浏览器上的代码 ----> 中间过程的代码 ----> 编译 打包 转换 ------> 浏览器可识别的  js /css /html
*
* npm run  build
*
*
* */
