
import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 设置一个独一无二的key
const timeKey = 'hrsaas-ihrm-timestamp' // 设定一个独一无二的时间戳key
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 读取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 存储时间戳
export function setTimeStamp() {
  // 设置时间戳，为当前的最新时间。

  Cookies.set(timeKey, Date.now())
}
