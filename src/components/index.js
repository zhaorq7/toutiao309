// 处理子组件挂载
import layoutHeader from './home/layout-header'
import layoutAside from './home/layout-aside'

export default {
  install: function (Vue) {
    Vue.component('layout-header', layoutHeader)
    Vue.component('layout-aside', layoutAside)
  }
}
