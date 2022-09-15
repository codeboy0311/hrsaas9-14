import request from '@/utils/request'
// 登录接口
export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    methods: 'post',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}
