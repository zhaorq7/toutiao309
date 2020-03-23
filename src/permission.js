import router from './router'

router.beforeEach(function (to, from, next) {
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

export default router
