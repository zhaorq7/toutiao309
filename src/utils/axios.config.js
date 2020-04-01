// 处理axios拦截器 请求拦截器  响应拦截器
import axios from 'axios'
import router from '../permission'
import { Message } from 'element-ui'// 消息通知
import jsonBigInt from 'json-bigint'

axios.defaults.baseURL = 'http://localhost:3031'

// 超大数字 js 处理不了   Number.MAX_SAFE_INTEGER
// console.log(Number.MAX_SAFE_INTEGER, '-----------')// 9007199254740991 安全整数 2的53次方
// console.log(9007199254740991 + 2) // 9007199254740992
// json-bright
axios.defaults.transformResponse = [function (data) {
  // data 响应的数据
  return data ? jsonBigInt.parse(data) : {}// 解决安全整数问题
}]

// 请求拦截器
axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}` // 统一注入token  授权
  // 必须要 return
  return config
}, function () {
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // debugger
  return response.data ? response.data : {}
}, function (error) {
  const status = error.response.status
  let message = ''
  switch (status) {
    case 400 :
      message = '请求参数错误'
      break
    case 403 :
      message = '用户非实名认证,无授权登陆'
      break
    case 507 :
      message = '服务器或数据库异常'
      break
    case 404:
      message = '手机号错误'
      break
    case 401:
      message = 'token未传 非法访问'
      window.localStorage.clear()
      router.push('/login')
      break
    default:
      message = error.response.data.message
      break
  }
  Message({
    type: 'warning',
    message
  })
  // 强行返回promise对象  表示 错误已经处理完毕  将错误截至
  return new Promise(function () {
  })
})

export default axios
