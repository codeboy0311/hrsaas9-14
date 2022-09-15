import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create(
  {
    baseURL: process.env.VUE_APP_BASE_API, // 随着开发环境，和生产环境
    timeout: 5000 // 超时时间
  }
)
// 请求拦截器
service.interceptors.request.use()
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
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误，当前执行链跳出成功，直接进入catch
})
export default service
