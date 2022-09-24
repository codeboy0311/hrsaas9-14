import store from '@/store'
import router from '@/router'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 7200 // 定时超时时间
const service = axios.create(
  {
    baseURL: process.env.VUE_APP_BASE_API, // 随着开发环境，和生产环境
    timeout: 5000 // 超时时间
  }
)
// 请求拦截器
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    //  只有在有token的情况下，才有必要检查时间戳是否超时
    if (IsCheckTimeOut()) {
      store.dispatch('logout')// 登出操作
      // 如果为true，就是过期了，
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    // 如果有token存在，注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  const { success, message, data } = response.data
  // 要根据success的成功与否，决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误，不应该进then，应该进入catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error('message'))
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当出现此状态码，则说明超时了
    store.dispatch('logout') // 调用退出登录
    router.push('/login') // 回到登录页
    return Promise.reject(new Error('超时了'))// 返回错误
  }
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误，当前执行链跳出成功，直接进入catch
})
// 是否 超时
// 超时逻辑 当前时间-缓存中的事件。是否大于事件差
function IsCheckTimeOut() {
  const time = Date.now()
  const timestamp = getTimeStamp()

  return (time - timestamp) / 1000 > TimeOut
}
export default service
