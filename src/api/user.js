import request from '@/utils/request'
// 登录接口
export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 获取用户的基本资料
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 根据用户id获取用户详情
export function getUserDetailById(id) {
  return request({
    method: 'get',
    url: `/sys/user/${id}`
  })
}
export function getInfo(token) {

}

export function logout() {

}
