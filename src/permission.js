import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 导航守卫
// 路由发生改变之前  打开

router.beforeEach(function (to, from, next) {
  nprogress.start()// 开启进度条

  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      // 放行
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// 路由变化完成之后 关闭

router.afterEach(function () {
  nprogress.done()// 关闭进度条
})

export default router
